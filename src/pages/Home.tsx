import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Paper, 
  Alert,
  Container,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  Chip,
  IconButton,
  alpha
} from '@mui/material';
import { Web3Context } from '../contexts/Web3Context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { motion } from 'framer-motion';

// Импортируем новые компоненты
import TrendingChart from '../components/TrendingChart';
import MarketSummary, { MarketStat } from '../components/MarketSummary';
import TrendingProjects from '../components/TrendingProjects';
import NetworkStats from '../components/NetworkStats';
import ThemeToggle from '../components/ThemeToggle';

// Добавим данные для MarketSummary
const marketSummaryData: MarketStat[] = [
  { 
    id: 'market-volume',
    title: 'Объем рынка', 
    value: 156800000, 
    change: 3.5, 
    isPositive: true 
  },
  { 
    id: 'active-projects',
    title: 'Активные проекты', 
    value: 145, 
    change: 5.8, 
    isPositive: true 
  },
  { 
    id: 'investors',
    title: 'Инвесторов', 
    value: 10045, 
    change: 8.2, 
    isPositive: true 
  },
  { 
    id: 'avg-return',
    title: 'Средняя доходность', 
    value: '18.5%', 
    change: 2.1, 
    isPositive: true 
  }
];

const Home: React.FC = () => {
  const { account, isLocalNode, networkName, darkMode } = useContext(Web3Context);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Информация о рыночных показателях
  const [marketIndicators, setMarketIndicators] = useState([
    { name: 'Общий объем', value: '12.45M ₽', change: '+5.3%', isPositive: true },
    { name: 'Активные проекты', value: '18', change: '+2', isPositive: true },
    { name: 'Средний рост', value: '4.2%', change: '+1.2%', isPositive: true },
    { name: 'Ликвидность', value: '3.8M ₽', change: '-0.8%', isPositive: false }
  ]);
  
  // Эффект анимации для индикаторов рынка
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketIndicators(prev => 
        prev.map(indicator => {
          // Извлекаем числовое значение из строки изменения (без знака и %)
          const changeText = indicator.change.replace(/%|\+|-/g, '');
          const changeValue = parseFloat(changeText);
          const randomChange = (Math.random() * 0.2 - 0.1).toFixed(1);
          const newChange = (changeValue + parseFloat(randomChange)).toFixed(1);
          // Конвертируем в число, чтобы выполнить сравнение
          const newChangeNum = parseFloat(newChange);
          
          return {
            ...indicator,
            change: (newChangeNum > 0 ? '+' : '') + newChange + '%',
            isPositive: newChangeNum > 0
          };
        })
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ pt: 4, pb: 8 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        className="tech-card"
        sx={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          mb: 6,
          background: 'var(--card-bg)',
          border: 'none'
        }}
      >
        <Grid container>
          {/* Левая колонка с текстом */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{
                p: { xs: 4, md: 6 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2
              }}
            >
              <Box 
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  borderRadius: 'var(--radius-md)',
                  px: 2,
                  py: 0.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  mb: 3,
                  fontWeight: 'medium'
                }}
              >
                <ShowChartIcon fontSize="small" sx={{ mr: 1 }} />
                Инвестируйте в реальные бизнес-проекты
              </Box>
              
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                  background: 'var(--text-gradient)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2
                }}
              >
                Chihuahua Capital
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 400,
                  color: 'text.secondary',
                  fontSize: { xs: '1.1rem', md: '1.3rem' }
                }}
              >
                Современная платформа для токенизации бизнеса
                и инвестирования в перспективные проекты
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2}
                sx={{ mb: 4 }}
              >
                {account ? (
                  <>
                    <Button
                      component={Link}
                      to="/create-token"
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-md)',
                        '&:hover': {
                          boxShadow: 'var(--shadow-lg)',
                          transform: 'translateY(-3px)',
                        },
                        textTransform: 'none'
                      }}
                      startIcon={<AddCircleOutlineIcon />}
                    >
                      Создать проект
                    </Button>
                    
                    <Button
                      component={Link}
                      to="/tokens"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderWidth: 2,
                        fontWeight: 600,
                        px: 4,
                        py: 1.5,
                        borderRadius: 'var(--radius-md)',
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-3px)',
                        },
                        textTransform: 'none'
                      }}
                      startIcon={<VisibilityIcon />}
                    >
                      Инвестировать
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'var(--gradient-primary)',
                      color: 'white',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      '&:hover': {
                        boxShadow: 'var(--shadow-lg)',
                        transform: 'translateY(-3px)',
                      },
                      textTransform: 'none'
                    }}
                  >
                    Подключите кошелек для начала работы
                  </Button>
                )}
              </Stack>
              
              <Box 
                className="glass-effect"
                sx={{ 
                  p: 2,
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 1,
                  backgroundColor: alpha(theme.palette.background.paper, 0.5)
                }}
              >
                {marketIndicators.map((indicator, index) => (
                  <Box key={index} sx={{ textAlign: 'center', px: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {indicator.name}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      className="tech-text" 
                      sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
                    >
                      {indicator.value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      className={indicator.isPositive ? "value-up" : "value-down"}
                      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {indicator.isPositive ? 
                        <ArrowDropUpIcon fontSize="small" /> : 
                        <ArrowDropDownIcon fontSize="small" />
                      }
                      {indicator.change}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          
          {/* Правая колонка с графиками */}
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 2, md: 4 },
                position: 'relative',
                backgroundColor: alpha(theme.palette.primary.main, 0.02)
              }}
            >
              <Box
                className="grid-line"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.2,
                  pointerEvents: 'none'
                }}
              />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TrendingChart 
                    title="Кофейня CoffeeMania"
                    symbol="CAFE"
                    currentValue={1250000}
                    changePercent={12.5}
                    isPositive={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TrendingChart 
                    title="Доставка GreenMeal"
                    symbol="GRMN"
                    currentValue={980000}
                    changePercent={5.7}
                    isPositive={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TrendingChart 
                    title="Прокат ВелоCity"
                    symbol="VELO"
                    currentValue={450000}
                    changePercent={1.8}
                    isPositive={true}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TrendingChart 
                    title="Пекарня BreadMaster"
                    symbol="BRDM"
                    currentValue={300000}
                    changePercent={-3.2}
                    isPositive={false}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        
        {/* Индикатор сети */}
        {networkName && (
          <Chip
            label={networkName}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              fontWeight: 'bold',
              bgcolor: isLocalNode ? 'var(--success-color)' : 'var(--info-color)',
              color: 'white',
              zIndex: 3
            }}
            size="small"
          />
        )}
        
        {/* Переключатель темы */}
        <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 3 }}>
          <ThemeToggle />
        </Box>
      </Paper>
      
      {/* Информация о локальной ноде */}
      {isLocalNode && networkName?.includes('Локальная') && (
        <Alert 
          severity="info" 
          variant="filled"
          sx={{ 
            mb: 4, 
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Режим локальной разработки активен!
          </Typography>
          <Typography variant="body2">
            Вы используете локальную Hardhat ноду для тестирования. Все транзакции и созданные токены существуют только локально.
          </Typography>
        </Alert>
      )}
      
      {/* Сетевая статистика */}
      {account && (
        <Box sx={{ mb: 6 }}>
          <NetworkStats />
        </Box>
      )}
      
      {/* Трендовые проекты */}
      <TrendingProjects />
      
      {/* Обзор рынка */}
      <MarketSummary data={marketSummaryData} />
      
      {/* Преимущества платформы */}
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center"
          sx={{ 
            fontWeight: 700, 
            mb: 4
          }}
        >
          Преимущества платформы
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              className="tech-card" 
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: alpha(theme.palette.primary.main, 0.03)
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <MonetizationOnIcon 
                    sx={{ 
                      fontSize: '2rem',
                      color: theme.palette.primary.main
                    }} 
                  />
                </Box>
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Токенизация бизнеса
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', flex: 1 }}>
                  Превратите ваш бизнес в цифровые активы и привлекайте инвестиции от пользователей со всего мира. Прозрачная и надежная система на блокчейне.
                </Typography>
                
                <Button 
                  component={Link}
                  to="/create-token"
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                >
                  Создать токен
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              className="tech-card" 
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: alpha(theme.palette.primary.main, 0.03)
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <BusinessCenterIcon 
                    sx={{ 
                      fontSize: '2rem',
                      color: theme.palette.primary.main
                    }} 
                  />
                </Box>
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Инвестирование в проекты
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', flex: 1 }}>
                  Инвестируйте в перспективные бизнес-проекты с помощью токенов. Получайте доход от роста стоимости токенов и различные бонусы от проектов.
                </Typography>
                
                <Button 
                  component={Link}
                  to="/tokens"
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                >
                  Изучить проекты
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              className="tech-card" 
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: alpha(theme.palette.primary.main, 0.03)
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <TrendingUpIcon 
                    sx={{ 
                      fontSize: '2rem',
                      color: theme.palette.primary.main
                    }} 
                  />
                </Box>
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Аналитика и рейтинги
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', flex: 1 }}>
                  Следите за ростом ваших инвестиций с помощью подробной аналитики. Изучайте рейтинги и статистику проектов для принятия обоснованных решений.
                </Typography>
                
                <Button 
                  component={Link}
                  to="/dashboard"
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                >
                  Открыть дашборд
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      {/* CTA секция */}
      <Box className="tech-card" sx={{ p: 4, textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
          Готовы начать?
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
          Присоединяйтесь к нашей платформе уже сегодня и откройте новые возможности для вашего бизнеса или инвестиций.
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          justifyContent="center"
        >
          <Button
            component={Link}
            to={account ? "/create-token" : "/"}
            variant="contained"
            size="large"
            sx={{
              background: 'var(--gradient-primary)',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 'var(--radius-md)',
              textTransform: 'none'
            }}
          >
            {account ? "Создать проект" : "Подключить кошелек"}
          </Button>
          
          <Button
            component={Link}
            to="/tokens"
            variant="outlined"
            size="large"
            sx={{
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              borderRadius: 'var(--radius-md)',
              textTransform: 'none'
            }}
          >
            Просмотреть проекты
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home; 