import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button, 
  useTheme, 
  alpha,
  Paper,
  Avatar,
  Divider,
  Tab,
  Tabs,
  IconButton,
  Skeleton,
  CircularProgress,
  Chip,
  useMediaQuery,
  Zoom,
  Fade,
  Slide
} from '@mui/material';
import DashboardCard from '../components/DashboardCard';
import { shortenAddress, formatNumber, formatAmount, formatPercentage } from '../utils';
import { Web3Context } from '../contexts/Web3Context';
import { motion } from 'framer-motion';

// Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TokenIcon from '@mui/icons-material/Token';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NetworkStats from '../components/NetworkStats';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import TrendingChart from '../components/TrendingChart';
import MarketSummary, { MarketStat } from '../components/MarketSummary';

// Sample data - in a real app, this would come from API
const dashboardStats = {
  totalInvestment: 250000,
  totalTokens: 15,
  activeInvestors: 128,
  marketVolume: 43250,
  recentPerformance: 8.2,
  topPerformers: [
    { id: 1, name: 'Bistro Milano', symbol: 'MLNO', value: 32500, change: 12.5 },
    { id: 2, name: 'Urban Coffee', symbol: 'UCOF', value: 28750, change: 8.7 },
    { id: 3, name: 'Tech Solutions Inc', symbol: 'TSOL', value: 41200, change: 5.2 },
    { id: 4, name: 'Green Farms', symbol: 'GRFM', value: 22800, change: -2.3 }
  ],
  recentActivity: [
    { 
      id: 1, 
      type: 'buy', 
      user: '0x1234...7890', 
      amount: 500, 
      token: 'MLNO', 
      tokenName: 'Bistro Milano',
      time: Date.now() - 1000 * 60 * 15 
    },
    { 
      id: 2, 
      type: 'tokenize', 
      user: '0x9876...5432', 
      token: 'GRFM', 
      tokenName: 'Green Farms',
      time: Date.now() - 1000 * 60 * 60 * 3 
    },
    { 
      id: 3, 
      type: 'sell', 
      user: '0x5678...1234', 
      amount: 200, 
      token: 'UCOF', 
      tokenName: 'Urban Coffee',
      time: Date.now() - 1000 * 60 * 60 * 12 
    },
    { 
      id: 4, 
      type: 'dividend', 
      token: 'TSOL', 
      tokenName: 'Tech Solutions Inc',
      amount: 5000,
      time: Date.now() - 1000 * 60 * 60 * 24 
    },
  ]
};

// Format timestamp to relative time
const timeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  
  return 'just now';
};

// Добавляем типы для активности
type ActivityType = 'buy' | 'sell' | 'tokenize' | 'dividend' | (string & {});

interface Activity {
  type: ActivityType;
  user?: string;
  amount?: number;
  token?: string;
  tokenName?: string;
  time?: number;
}

// Activity item component
interface ActivityItemProps {
  activity: {
    id: number;
    type: string;
    user?: string;
    amount?: number;
    token?: string;
    tokenName?: string;
    time: number;
  };
  delay: number;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, delay }) => {
  const theme = useTheme();
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <TrendingUpIcon fontSize="small" />;
      case 'sell':
        return <TrendingDownIcon fontSize="small" />;
      case 'tokenize':
        return <TokenIcon fontSize="small" />;
      case 'dividend':
        return <AttachMoneyIcon fontSize="small" />;
      default:
        return <MoreVertIcon fontSize="small" />;
    }
  };
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'buy':
        return theme.palette.success.main;
      case 'sell':
        return theme.palette.error.main;
      case 'tokenize':
        return theme.palette.primary.main;
      case 'dividend':
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  const getActivityMessage = (activity: { 
    type: string;
    user?: string;
    amount?: number;
    token?: string;
    tokenName?: string;
  }) => {
    switch (activity.type) {
      case 'buy':
        return `${shortenAddress(activity.user ?? '')} purchased ${formatAmount(activity.amount ?? 0)} ${activity.token ?? ''}`;
      case 'sell':
        return `${shortenAddress(activity.user ?? '')} sold ${formatAmount(activity.amount ?? 0)} ${activity.token ?? ''}`;
      case 'tokenize':
        return `${shortenAddress(activity.user ?? '')} tokenized ${activity.tokenName ?? ''} as ${activity.token ?? ''}`;
      case 'dividend':
        return `${activity.tokenName ?? ''} distributed ${formatAmount(activity.amount ?? 0)} in dividends`;
      default:
        return `Unknown activity with ${activity.token ?? 'unknown token'}`;
    }
  };
  
  return (
    <Fade in={true} style={{ transitionDelay: `${delay * 150}ms` }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay * 0.1 }}
        sx={{ 
          mb: 2,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          background: alpha(getActivityColor(activity.type), 0.05),
          '&:hover': {
            background: alpha(getActivityColor(activity.type), 0.1),
            transform: 'translateX(8px)',
            transition: 'all 0.3s ease'
          }
        }}
      >
        <Avatar
          sx={{
            mr: 2,
            bgcolor: alpha(getActivityColor(activity.type), 0.2),
            color: getActivityColor(activity.type)
          }}
        >
          {getActivityIcon(activity.type)}
        </Avatar>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {getActivityMessage(activity)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activity.tokenName} • {activity.token}
          </Typography>
        </Box>
        
        <Chip 
          label={timeAgo(activity.time ?? 0)}
          size="small"
          sx={{ 
            bgcolor: alpha(getActivityColor(activity.type), 0.1),
            color: getActivityColor(activity.type),
            fontWeight: 500
          }}
        />
      </Box>
    </Fade>
  );
};

// Dashboard Tab Component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { provider, networkStats, refreshNetworkStats, isLocalNode } = useContext(Web3Context);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleRefresh = () => {
    setLoading(true);
    refreshNetworkStats();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Обновленные данные для графиков с добавлением timeframe
  const trendingCharts = [
    {
      title: 'CoffeeMania',
      symbol: 'CAFE',
      currentValue: 1250000,
      changePercent: 12.5,
      isPositive: true,
      timeframe: '1d' as const
    },
    {
      title: 'Доставка "GreenMeal"',
      symbol: 'GRNM',
      currentValue: 956.35,
      changePercent: -1.42,
      isPositive: false,
      timeframe: '1d' as const
    },
    {
      title: 'Фитнес-центр "PowerFit"',
      symbol: 'PWFT',
      currentValue: 2123.90,
      changePercent: 5.68,
      isPositive: true,
      timeframe: '1d' as const
    },
    {
      title: 'Автосервис "FastCar"',
      symbol: 'FCAR',
      currentValue: 724.15,
      changePercent: 0.75,
      isPositive: true,
      timeframe: '1d' as const
    }
  ];

  // Обновленные объекты для маркет-данных, соответствующие интерфейсу MarketStat
  const marketSummaryData = {
    title: 'Рыночная статистика',
    stats: [
      { title: 'Общий капитал', value: '₽1,560,000,000', isPrice: true },
      { title: 'Активные проекты', value: 47, isPrice: false, changePercent: 4.2, isPositive: true },
      { title: 'Токены в обращении', value: 125, isPrice: false },
      { title: 'Инвесторы', value: 12480, isPrice: false, changePercent: 8.5, isPositive: true }
    ]
  };

  const portfolioSummary = {
    title: 'Ваш портфель',
    stats: [
      { title: 'Баланс', value: 158900, isPrice: true },
      { title: 'Число проектов', value: 6, isPrice: false },
      { title: 'Доходность (мес)', value: 4.8, isPrice: false, changePercent: 1.2, isPositive: true },
      { title: 'Доходность (год)', value: 22.5, isPrice: false, changePercent: 3.5, isPositive: true }
    ]
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Заголовок и кнопки действий */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold" className="text-gradient">
          Панель управления
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AccountBalanceWalletIcon />}
            sx={{
              fontWeight: 'bold',
              py: 1
            }}
          >
            Пополнить счет
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<TrendingUpIcon />}
            sx={{ 
              fontWeight: 'bold',
              py: 1
            }}
          >
            Инвестировать
          </Button>
        </Box>
      </Box>
      
      {/* Статистика рынка */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <MarketSummary data={marketSummaryData.stats.map((stat, index) => ({
            id: `market-${index}`,
            title: stat.title,
            value: stat.value,
            change: stat.changePercent || 0,
            isPositive: stat.isPositive !== undefined ? stat.isPositive : true
          }))} />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <MarketSummary data={portfolioSummary.stats.map((stat, index) => ({
            id: `portfolio-${index}`,
            title: stat.title,
            value: stat.value,
            change: stat.changePercent || 0,
            isPositive: stat.isPositive !== undefined ? stat.isPositive : true
          }))} />
        </Grid>
      </Grid>
      
      {/* Графики цен */}
      <Grid container spacing={2}>
        {trendingCharts.map((chart, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <TrendingChart {...chart} />
          </Grid>
        ))}
      </Grid>
      
      {/* Графики трендов */}
      <Box sx={{ mb: 4 }}>
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center" gap={1}>
            <ShowChartIcon /> Популярные проекты
          </Typography>
          
          <Button 
            variant="text" 
            color="primary"
            sx={{ fontWeight: 'medium' }}
          >
            Смотреть все
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {trendingCharts.map((chart, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <TrendingChart {...chart} />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Секция рекомендаций */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        sx={{
          p: 3,
          border: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Откройте новые возможности для инвестиций
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              На основе анализа вашего портфеля мы подобрали проекты, которые могут вас заинтересовать.
              Диверсифицируйте инвестиции и повысьте потенциальную доходность.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
                Смотреть рекомендации
              </Button>
              <Button variant="outlined" sx={{ fontWeight: 'bold' }}>
                Аналитический отчет
              </Button>
                        </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Box 
              component="img"
              src="/images/analysis.svg"
              alt="Аналитика инвестиций"
              sx={{ 
                maxWidth: '100%', 
                height: 'auto',
                maxHeight: '200px'
              }}
            />
          </Grid>
        </Grid>
        
        {/* Декоративный фон */}
                          <Box 
                            sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            opacity: 0.05,
            background: `radial-gradient(circle at 70% 30%, ${theme.palette.primary.main}, transparent 60%)`
          }}
        />
            </Paper>
    </Container>
  );
};

export default Dashboard; 