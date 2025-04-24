import React, { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, ButtonGroup, Button, useTheme, alpha, Grid, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar as RechartsBar
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TungstenIcon from '@mui/icons-material/Tungsten';
import { format } from 'date-fns';

// Типы периодов для отображения графика
type Period = '24h' | '7d' | '30d' | '90d';

// Типизация для данных графика
interface ChartData {
  date: string;
  price: number;
  volume?: number;
}

interface CryptoChartProps {
  title?: string;
  tokenSymbol?: string;
  defaultCurrentPrice?: number;
  changePercent?: number;
  isPositive?: boolean;
  showVolume?: boolean;
}

// Интерфейс для пропсов тултипа
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload: ChartData;
  }>;
  label?: string;
}

// Функция для генерации случайных данных графика
const generateChartData = (
  days: number,
  trend: 'up' | 'down' | 'volatile'
): ChartData[] => {
  const data: ChartData[] = [];
  let price = 0.5 + Math.random() * 0.5; // Начальная цена между 0.5 и 1.0
  
  const date = new Date();
  date.setDate(date.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + i);
    
    let change = 0;
    
    switch (trend) {
      case 'up':
        // Восходящий тренд с небольшими колебаниями
        change = (Math.random() * 0.06) - 0.02;
        break;
      case 'down':
        // Нисходящий тренд с небольшими колебаниями
        change = (Math.random() * 0.06) - 0.04;
        break;
      case 'volatile':
        // Волатильность с большими колебаниями
        change = (Math.random() * 0.1) - 0.05;
        break;
    }
    
    // Гарантируем долгосрочный тренд
    if (trend === 'up' && i > days * 0.8) {
      change = Math.abs(change) * 1.5; // Усиливаем рост в конце периода
    }
    if (trend === 'down' && i < days * 0.2) {
      change = -Math.abs(change) * 1.5; // Усиливаем падение в начале периода
    }
    
    price = Math.max(0.1, price * (1 + change));
    
    // Генерируем объем торгов (случайно от 10% до 50% от цены)
    const volume = price * (0.1 + Math.random() * 0.4) * 1000;
    
    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      price,
      volume: Math.round(volume)
    });
  }
  
  return data;
};

// Форматирование подсказки при наведении
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={2}
        sx={{
          padding: 1.5,
          borderRadius: 1,
          backdropFilter: 'blur(4px)',
          bgcolor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
          {label}
        </Typography>
        <Typography variant="body2" color="primary">
          Цена: {payload[0].value.toLocaleString('ru-RU')} ₽
        </Typography>
        {payload[0].payload.volume && (
          <Typography variant="body2" color="text.secondary">
            Объем: {payload[0].payload.volume.toLocaleString('ru-RU')} ₽
          </Typography>
        )}
      </Paper>
    );
  }
  
  return null;
};

// Компонент обратного отсчета
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Дата запуска токена (2 месяца от текущей даты)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 2);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Компонент для отображения единицы времени
  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <Box sx={{ textAlign: 'center', mx: 1 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          minWidth: { xs: 60, md: 80 },
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            fontFamily: 'monospace'
          }}
        >
          {value.toString().padStart(2, '0')}
        </Typography>
      </Paper>
      <Typography 
        variant="caption" 
        sx={{ 
          mt: 1, 
          display: 'block',
          opacity: 0.7
        }}
      >
        {label}
      </Typography>
    </Box>
  );
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <TimeUnit value={timeLeft.days} label="ДНЕЙ" />
      <TimeUnit value={timeLeft.hours} label="ЧАСОВ" />
      <TimeUnit value={timeLeft.minutes} label="МИНУТ" />
      <TimeUnit value={timeLeft.seconds} label="СЕКУНД" />
    </Box>
  );
};

// Компонент для отображения цены
const PriceDisplay = ({ currentPrice, percentChange }: { currentPrice: number, percentChange: number }) => {
  const isPositive = percentChange >= 0;
  
  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography 
        variant="h3" 
        component="div" 
        sx={{ 
          fontWeight: 'bold',
          mb: 0.5,
          fontFamily: 'monospace'
        }}
      >
        ${currentPrice.toFixed(2)}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          color: isPositive ? 'success.main' : 'error.main',
          fontWeight: 'bold'
        }}
      >
        {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
      </Typography>
    </Box>
  );
};

// Компонент для рисования SVG графика
const Chart = ({ data, width, height }: { data: ChartData[], width: number, height: number }) => {
  const theme = useTheme();
  
  // Вычисляем минимальную и максимальную цену для масштабирования
  const minPrice = Math.min(...data.map(d => d.price)) * 0.95;
  const maxPrice = Math.max(...data.map(d => d.price)) * 1.05;
  
  // Функция для масштабирования значений X
  const scaleX = (index: number): number => {
    return (width / (data.length - 1)) * index;
  };
  
  // Функция для масштабирования значений Y
  const scaleY = (price: number): number => {
    return height - ((price - minPrice) / (maxPrice - minPrice)) * height;
  };
  
  // Создаем путь для линии графика
  const linePath = data.map((d, i) => {
    return `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.price)}`;
  }).join(' ');
  
  // Создаем путь для градиентной заливки
  const areaPath = `
    ${linePath}
    L ${scaleX(data.length - 1)} ${height}
    L ${scaleX(0)} ${height}
    Z
  `;
  
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity="0.5" />
          <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6a11cb" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
      </defs>
      
      {/* Заливка под графиком */}
      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        d={areaPath}
        fill="url(#areaGradient)"
      />
      
      {/* Линия графика */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        d={linePath}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Точки данных */}
      {data.map((d, i) => (
        <motion.circle
          key={i}
          initial={{ opacity: 0, r: 0 }}
          animate={{ opacity: i % 5 === 0 ? 1 : 0, r: i % 5 === 0 ? 4 : 0 }}
          transition={{ duration: 0.5, delay: 1 + (i / data.length) * 0.5 }}
          cx={scaleX(i)}
          cy={scaleY(d.price)}
          fill="#FFFFFF"
          stroke="#2575fc"
          strokeWidth={2}
        />
      ))}
    </svg>
  );
};

const CryptoChart: React.FC<CryptoChartProps> = ({
  title = "Прогноз Чиху коина",
  tokenSymbol = "CHIH",
  defaultCurrentPrice = 1250,
  changePercent = 5.76,
  isPositive = true,
  showVolume = true
}) => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('7d');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '3M' | '1Y'>('1M');
  const [isLoading, setIsLoading] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 800, height: 300 });
  
  // Цвета для графика
  const chartColor = isPositive 
    ? theme.palette.success.main 
    : theme.palette.error.main;
  
  // Обновление данных при изменении периода или переключении временного интервала
  useEffect(() => {
    setIsLoading(true);
    
    // Симуляция загрузки данных
    const timer = setTimeout(() => {
      let days;
      let trend: 'up' | 'down' | 'volatile';
      
      // Определяем количество дней и тренд в зависимости от выбранного timeframe
      switch (timeframe) {
        case '1W':
          days = 7;
          trend = 'volatile';
          break;
        case '1M':
          days = 30;
          trend = 'up';
          break;
        case '3M':
          days = 90;
          trend = 'up';
          break;
        case '1Y':
          days = 365;
          trend = 'up';
          break;
        default:
          days = 30;
          trend = 'up';
      }
      
      // Генерируем новые данные и обновляем состояние
      const newData = generateChartData(days, trend);
      setChartData(newData);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [timeframe, selectedPeriod]); // Зависим и от периода, и от timeframe
  
  useEffect(() => {
    if (chartContainerRef.current) {
      // Устанавливаем размеры графика в зависимости от контейнера
      const updateDimensions = () => {
        if (chartContainerRef.current) {
          const width = chartContainerRef.current.clientWidth;
          setChartDimensions({
            width: width,
            height: Math.min(300, width * 0.4)
          });
        }
      };
      
      updateDimensions();
      
      // Обновляем размеры при изменении размера окна
      window.addEventListener('resize', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, [chartContainerRef]);
  
  // Получаем текущую цену и процент изменения
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : defaultCurrentPrice;
  const previousPrice = chartData.length > 0 ? chartData[0].price : 0;
  const percentChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.95)}, ${alpha(theme.palette.background.paper, 0.85)})`,
        backdropFilter: 'blur(10px)',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Заголовок и текущая цена */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <TungstenIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {tokenSymbol} • Предполагаемый запуск
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" fontWeight="bold">
            ${currentPrice.toFixed(2)}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: isPositive ? theme.palette.success.main : theme.palette.error.main 
            }}
          >
            {isPositive ? (
              <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
            ) : (
              <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
            )}
            {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
          </Typography>
        </Box>
      </Box>
      
      {/* Переключатели периодов */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonGroup size="small" variant="outlined">
          <Button 
            onClick={() => setSelectedPeriod('24h')}
            variant={selectedPeriod === '24h' ? 'contained' : 'outlined'}
          >
            24ч
          </Button>
          <Button 
            onClick={() => setSelectedPeriod('7d')}
            variant={selectedPeriod === '7d' ? 'contained' : 'outlined'}
          >
            7д
          </Button>
          <Button 
            onClick={() => setSelectedPeriod('30d')}
            variant={selectedPeriod === '30d' ? 'contained' : 'outlined'}
          >
            30д
          </Button>
          <Button 
            onClick={() => setSelectedPeriod('90d')}
            variant={selectedPeriod === '90d' ? 'contained' : 'outlined'}
          >
            90д
          </Button>
        </ButtonGroup>
      </Box>
      
      {/* График цены */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{ height: 300, mb: showVolume ? 3 : 0 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
              tickMargin={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
              tickMargin={10}
              domain={['dataMin - 100', 'dataMax + 100']}
              tickFormatter={(value) => `${value} ₽`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} vertical={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={chartColor} 
              strokeWidth={2}
              fill="url(#colorValue)" 
              fillOpacity={0.8}
              activeDot={{ r: 6, strokeWidth: 0, fill: chartColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      
      {/* График объема торгов */}
      {showVolume && (
        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          sx={{ height: 100 }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Прогнозируемый объем торгов
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis 
                dataKey="date" 
                hide 
              />
              <Tooltip content={<CustomTooltip />} />
              <RechartsBar
                dataKey="volume" 
                fill={alpha(chartColor, 0.5)}
                radius={[2, 2, 0, 0]} 
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </Box>
      )}
      
      {/* Примечание */}
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          display: 'block', 
          mt: 1,
          textAlign: 'center',
          opacity: 0.7
        }}
      >
        * График показывает прогнозируемые данные
      </Typography>
    </Paper>
  );
};

export default CryptoChart; 