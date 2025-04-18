import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { motion } from 'framer-motion';

// Указываем генерацию случайных данных для графика
const generateChartData = (isPositive: boolean, points = 24): number[] => {
  // Начальное значение
  let value = 500 + Math.random() * 500;
  const volatility = 0.03; // Волатильность (размах колебаний)
  const trend = isPositive ? 0.01 : -0.01; // Общий тренд (рост/падение)
  
  return Array(points).fill(0).map(() => {
    // Случайное изменение с учетом тренда
    const change = (Math.random() - 0.5) * volatility + trend;
    value = Math.max(10, value * (1 + change));
    return value;
  });
};

interface TrendingChartProps {
  title: string;
  symbol: string;
  currentValue: number;
  changePercent: number;
  isPositive: boolean;
  timeframe?: '1d' | '1w' | '1m' | '1y';
  height?: number;
}

const TrendingChart: React.FC<TrendingChartProps> = ({
  title,
  symbol,
  currentValue,
  changePercent,
  isPositive,
  timeframe = '1d',
  height,
}) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Генерация данных при монтировании или изменении флага isPositive
  useEffect(() => {
    setChartData(generateChartData(isPositive));
    // Запуск анимации
    setIsAnimating(true);
  }, [isPositive, timeframe]);

  // Цвета для графика в зависимости от тренда (рост/падение)
  const chartColor = isPositive 
    ? theme.palette.success.main 
    : theme.palette.error.main;
  
  const chartGradient = isPositive 
    ? `linear-gradient(180deg, ${theme.palette.success.light}50 0%, transparent 100%)` 
    : `linear-gradient(180deg, ${theme.palette.error.light}50 0%, transparent 100%)`;

  // Вычисляем максимум и минимум для масштабирования графика
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue;

  // Форматирование суммы в рубли
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      {/* Информация о цене и изменении */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'baseline',
        mb: 1 
      }}>
        <Typography variant="h6" fontWeight="bold">
          {formatCurrency(currentValue)}
        </Typography>
        <Typography 
          variant="body2" 
          color={isPositive ? 'success.main' : 'error.main'}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontWeight: 'medium' 
          }}
        >
          {isPositive ? (
            <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
          ) : (
            <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
          )}
          {changePercent.toFixed(2)}%
        </Typography>
      </Box>
      
      {/* Сам график */}
      <Box sx={{ 
        height: 'calc(100% - 30px)', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Градиентная область под линией */}
        <Box sx={{ 
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: chartGradient,
          clipPath: chartData.length > 0 
            ? `polygon(
                0 ${100 - ((chartData[0] - minValue) / range) * 100}%, 
                ${chartData.map((value, index) => 
                  `${(index / (chartData.length - 1)) * 100}% ${100 - ((value - minValue) / range) * 100}%`
                ).join(', ')},
                100% 100%,
                0 100%
              )`
            : '',
          zIndex: 1
        }} />
        
        {/* Линия графика с анимацией */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartData.length - 1} 100`}
          preserveAspectRatio="none"
          style={{ position: 'absolute', zIndex: 2 }}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: isAnimating ? 1 : 0,
              transition: { duration: 1.5, ease: "easeInOut" }
            }}
            onAnimationComplete={() => setIsAnimating(false)}
            d={chartData.length > 0 
              ? `M${chartData.map((value, index) => 
                  `${index} ${100 - ((value - minValue) / range) * 100}`
                ).join(' L')}`
              : ''}
            fill="none"
            stroke={chartColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Точка текущего значения */}
        {chartData.length > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 1,
              transition: { delay: 1.5, duration: 0.3 } 
            }}
            style={{
              position: 'absolute',
              right: '0%',
              bottom: `${((chartData[chartData.length - 1] - minValue) / range) * 100}%`,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: chartColor,
              transform: 'translate(50%, 50%)',
              boxShadow: `0 0 8px ${chartColor}`,
              zIndex: 3
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default TrendingChart; 