import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  useTheme,
  alpha,
  Divider,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  KeyboardArrowUp as KeyboardArrowUpIcon, 
  KeyboardArrowDown as KeyboardArrowDownIcon,
  InfoOutlined as InfoOutlinedIcon 
} from '@mui/icons-material';

// Интерфейс для статистики рынка
export interface MarketStat {
  id: string;
  title: string;
  value: string | number;
  formattedValue?: string;
  change: number;
  isPositive: boolean;
  tooltip?: string;
}

interface MarketSummaryProps {
  data: MarketStat[];
}

// Функция для форматирования чисел с разделителями
const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)} млн ₽`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} тыс ₽`;
  }
  return num.toString();
};

// Обработка разных форматов входных данных для обратной совместимости
const MarketSummary: React.FC<MarketSummaryProps | any> = (props) => {
  const theme = useTheme();
  
  // Преобразуем старый формат данных в новый при необходимости
  let data: MarketStat[] = [];
  
  // Если передан новый формат с полем data
  if (props.data && Array.isArray(props.data)) {
    data = props.data;
  } 
  // Если передан старый формат с полями totalMarketVolume и т.д.
  else if (props.totalMarketVolume !== undefined) {
    data = [
      { 
        id: 'market-volume', 
        title: 'Общий объем рынка', 
        value: props.totalMarketVolume,
        change: 2.34, 
        isPositive: true 
      },
      { 
        id: 'trading-volume', 
        title: 'Объем торгов (24ч)', 
        value: props.tradingVolume24h,
        change: 5.6, 
        isPositive: true 
      },
      { 
        id: 'active-projects', 
        title: 'Активные проекты', 
        value: props.activeProjects,
        change: 12.5, 
        isPositive: true 
      },
      { 
        id: 'average-return', 
        title: 'Средняя доходность', 
        value: props.averageReturn,
        change: 1.2, 
        isPositive: true 
      }
    ];
  }
  // Если переданы свойства в старом формате title и stats
  else if (props.title && props.stats && Array.isArray(props.stats)) {
    data = props.stats.map((stat: any, index: number) => ({
      id: `stat-${index}`,
      title: stat.title,
      value: stat.value,
      change: stat.changePercent || 0,
      isPositive: stat.isPositive !== undefined ? stat.isPositive : true
    }));
  } 
  // Если нет данных, используем заглушку
  else {
    data = [
      { id: 'placeholder', title: 'Нет данных', value: '-', change: 0, isPositive: true }
    ];
  }

  // Контейнер-вариант для анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Элемент-вариант для анимации
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: theme.shadows[2],
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        height: '100%'
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Обзор рынка
      </Typography>

      <Grid 
        container 
        spacing={3} 
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.map((stat) => (
          <Grid item xs={6} md={3} key={stat.id} component={motion.div} variants={itemVariants}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
                {stat.tooltip && (
                  <Tooltip title={stat.tooltip} placement="top">
                    <InfoOutlinedIcon 
                      sx={{ 
                        ml: 0.5, 
                        fontSize: 16, 
                        color: alpha(theme.palette.text.secondary, 0.7),
                        cursor: 'help'
                      }} 
                    />
                  </Tooltip>
                )}
              </Box>
              
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                {stat.formattedValue || (typeof stat.value === 'number' ? formatLargeNumber(stat.value as number) : stat.value)}
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: stat.isPositive ? theme.palette.success.main : theme.palette.error.main,
                }}
              >
                {stat.isPositive ? (
                  <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                )}
                <Typography variant="caption" fontWeight="medium">
                  {stat.isPositive ? '+' : ''}{stat.change}%
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                  за 24ч
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      
      <Divider sx={{ my: 3, opacity: 0.7 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Данные обновляются в реальном времени
        </Typography>
        
        <Box 
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          sx={{ 
            px: 1.5, 
            py: 0.5, 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: 'medium',
            fontSize: '0.75rem',
            transition: 'all 0.2s'
          }}
        >
          Полная статистика
        </Box>
      </Box>
    </Paper>
  );
};

export default MarketSummary; 