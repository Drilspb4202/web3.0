import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import MarketSummary, { MarketStat } from '../components/MarketSummary';
import TrendingChart from '../components/TrendingChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Преобразуем объект в массив MarketStat для MarketSummary
const convertToMarketStats = (data: any): MarketStat[] => {
  return [
    { 
      id: 'market-volume',
      title: 'Общий объем рынка', 
      value: data.totalMarketVolume,
      change: 2.5,
      isPositive: true
    },
    {
      id: 'trade-volume',
      title: 'Объем торгов 24ч', 
      value: data.tradingVolume24h,
      change: 5.2,
      isPositive: true
    },
    {
      id: 'active-projects',
      title: 'Активные проекты', 
      value: data.activeProjects,
      change: 1.8,
      isPositive: true
    },
    {
      id: 'average-return',
      title: 'Средняя доходность', 
      value: data.averageReturn,
      change: 3.4,
      isPositive: true
    }
  ];
};

const mockMarketData = {
  totalMarketVolume: 1250000000,
  tradingVolume24h: 37500000,
  activeProjects: 48,
  averageReturn: 12.4
};

const mockTrendingProjects = [
  {
    id: 1,
    title: 'Кофейня "CoffeeMania"',
    symbol: 'COFFEE',
    currentValue: 1240000,
    changePercent: 8.5,
    isPositive: true,
    timeframe: '1d' as const
  },
  {
    id: 2,
    title: 'Доставка "GreenMeal"',
    symbol: 'GMEAL',
    currentValue: 2350000,
    changePercent: 12.3,
    isPositive: true,
    timeframe: '1d' as const
  },
  {
    id: 3,
    title: 'Пекарня "BreadWay"',
    symbol: 'BREAD',
    currentValue: 750000,
    changePercent: -2.1,
    isPositive: false,
    timeframe: '1d' as const
  },
  {
    id: 4,
    title: 'Коворкинг "FlexSpace"',
    symbol: 'FLEX',
    currentValue: 1850000,
    changePercent: 5.7,
    isPositive: true,
    timeframe: '1d' as const
  }
];

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const [lastUpdated, setLastUpdated] = React.useState<Date>(new Date());
  
  const handleRefresh = () => {
    // В реальном приложении здесь был бы запрос к API для обновления данных
    setLastUpdated(new Date());
  };
  
  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Container maxWidth="xl">
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        {/* Заголовок с информацией об обновлении */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Панель мониторинга
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              Последнее обновление: {formatDateTime(lastUpdated)}
            </Typography>
            
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />} 
              size="small"
              onClick={handleRefresh}
            >
              Обновить
            </Button>
          </Box>
        </Box>
        
        {/* Рыночное резюме */}
        <Box sx={{ mb: 4 }}>
          <MarketSummary data={convertToMarketStats(mockMarketData)} />
        </Box>
        
        {/* Графики популярных проектов */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Популярные проекты
            </Typography>
            
            <Button 
              endIcon={<MoreHorizIcon />}
              sx={{ textTransform: 'none' }}
            >
              Посмотреть все
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {mockTrendingProjects.map((project) => (
              <Grid item xs={12} sm={6} lg={3} key={project.id}>
                <TrendingChart
                  title={project.title}
                  symbol={project.symbol}
                  currentValue={project.currentValue}
                  changePercent={project.changePercent}
                  isPositive={project.isPositive}
                  timeframe={project.timeframe}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Секция помощи */}
        <Paper
          component={motion.div}
          whileHover={{ y: -3, boxShadow: theme.shadows[3] }}
          sx={{
            p: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.2)
          }}
        >
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
              Нужна помощь с инвестированием?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600 }}>
              Наши эксперты готовы ответить на ваши вопросы и помочь с выбором подходящих проектов для инвестирования. 
              Запишитесь на бесплатную консультацию прямо сейчас.
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            size="large"
            sx={{
              borderRadius: 8,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: theme.shadows[3]
            }}
          >
            Записаться на консультацию
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage; 