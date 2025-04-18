import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Paper, 
  Button, 
  useTheme, 
  alpha,
  Avatar,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import TrendingChart from './TrendingChart';
import MarketSummary, { MarketStat } from './MarketSummary';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const theme = useTheme();

  // Данные для TrendingChart компонентов
  const trendingData = [
    { 
      title: 'CoffeeMania', 
      symbol: 'CAFÉ', 
      currentValue: 3650, 
      changePercent: 12.5, 
      isPositive: true 
    },
    { 
      title: 'GreenMeal', 
      symbol: 'GRMN', 
      currentValue: 1560, 
      changePercent: 8.2, 
      isPositive: true 
    },
    { 
      title: 'BreadMaster', 
      symbol: 'BRDM', 
      currentValue: 990, 
      changePercent: -3.2, 
      isPositive: false 
    },
    { 
      title: 'VeloCity', 
      symbol: 'VELO', 
      currentValue: 1625, 
      changePercent: 1.8, 
      isPositive: true 
    }
  ];

  // Данные для MarketSummary компонента
  const marketSummaryData: MarketStat[] = [
    { 
      id: 'market-volume',
      title: 'Общий объем рынка', 
      value: 95600000, 
      change: 2.34, 
      isPositive: true,
      tooltip: 'Совокупная капитализация всех токенов на платформе'
    },
    { 
      id: 'trade-volume',
      title: 'Объем торгов (24ч)', 
      value: 1245000, 
      change: 5.6, 
      isPositive: true,
      tooltip: 'Суммарный объем торгов за последние 24 часа'
    },
    { 
      id: 'active-projects',
      title: 'Активные проекты', 
      value: 18, 
      change: 12.5, 
      isPositive: true,
      tooltip: 'Количество активных проектов на платформе' 
    },
    { 
      id: 'average-yield',
      title: 'Средняя доходность', 
      value: 8.7, 
      change: 1.2, 
      isPositive: true,
      tooltip: 'Средняя доходность по всем проектам (% годовых)' 
    }
  ];

  // Данные для блока Предстоящие проекты
  const upcomingProjects = [
    {
      name: 'FitSpace',
      description: 'Сеть премиальных фитнес-клубов',
      logo: '🏋️',
      goal: 5000000,
      category: 'Фитнес'
    },
    {
      name: 'TechHub',
      description: 'Коворкинг для IT-специалистов',
      logo: '💻',
      goal: 3800000,
      category: 'Бизнес'
    },
    {
      name: 'GreenGarden',
      description: 'Вертикальные городские фермы',
      logo: '🌱',
      goal: 4200000,
      category: 'Экология'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Панель управления
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Добро пожаловать в Chihuahua Capital — платформу инвестиций в бизнес-проекты
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Блок с популярными проектами */}
        <Grid item xs={12} lg={8}>
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              p: 2,
              borderRadius: 2,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              backdropFilter: 'blur(20px)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Популярные проекты
              </Typography>
              <Button 
                component={Link} 
                to="/projects" 
                endIcon={<ArrowForwardIcon />} 
                size="small"
              >
                Все проекты
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              {trendingData.map((data, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TrendingChart 
                    title={data.title}
                    symbol={data.symbol}
                    currentValue={data.currentValue}
                    changePercent={data.changePercent}
                    isPositive={data.isPositive}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Блок с обзором рынка */}
        <Grid item xs={12} lg={4}>
          <MarketSummary data={marketSummaryData} />
        </Grid>

        {/* Блок с предстоящими проектами */}
        <Grid item xs={12}>
          <Paper
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme.palette.divider,
              backdropFilter: 'blur(20px)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Предстоящие проекты
              </Typography>
              <Button 
                component={Link} 
                to="/projects?tab=upcoming" 
                endIcon={<ArrowForwardIcon />} 
                size="small"
              >
                Все предстоящие
              </Button>
            </Box>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <Grid container spacing={2}>
                {upcomingProjects.map((project, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div variants={itemVariants}>
                      <Paper
                        sx={{
                          p: 2,
                          height: '100%',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.1),
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[4],
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <Avatar 
                            sx={{ 
                              mr: 1.5, 
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              fontSize: '1.2rem'
                            }}
                          >
                            {project.logo}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {project.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: 'text.secondary',
                                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                borderRadius: 1,
                                px: 0.7,
                                py: 0.2
                              }}
                            >
                              {project.category}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {project.description}
                        </Typography>
                        
                        <Divider sx={{ my: 1.5 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            Целевая сумма
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {new Intl.NumberFormat('ru-RU', {
                              style: 'currency',
                              currency: 'RUB',
                              maximumFractionDigits: 0
                            }).format(project.goal)}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ mt: 2 }}>
                          <Button 
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={{ 
                              borderRadius: 2,
                              py: 0.7
                            }}
                          >
                            Узнать подробнее
                          </Button>
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 