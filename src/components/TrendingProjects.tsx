import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Chip, 
  Button,
  useTheme,
  alpha
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TrendingChart from './TrendingChart';

// Трендовые проекты
const trendingProjects = [
  {
    id: 1,
    name: "Кофейня 'CoffeeMania'",
    description: "Сеть уютных кофеен в бизнес-центрах с уникальными сортами кофе и быстрым обслуживанием.",
    symbol: "CAFÉ",
    logo: "https://via.placeholder.com/150/8E44AD/FFFFFF?text=CM",
    currentValue: 0.0725,
    changePercent: 12.5,
    raised: 70000,
    goal: 100000,
    category: "Общепит",
    isPositive: true
  },
  {
    id: 3,
    name: "Фитнес-центр 'PowerZone'",
    description: "Современный фитнес-центр с новейшим оборудованием и профессиональными тренерами.",
    symbol: "PWZ",
    logo: "https://via.placeholder.com/150/E74C3C/FFFFFF?text=PZ",
    currentValue: 0.0854,
    changePercent: 5.7,
    raised: 125000,
    goal: 150000,
    category: "Спорт",
    isPositive: true
  },
  {
    id: 6,
    name: "Прокат велосипедов 'ВелоCity'",
    description: "Прокат электровелосипедов в центре города с приложением для отслеживания и удобной оплатой.",
    symbol: "VELO",
    logo: "https://via.placeholder.com/150/3498DB/FFFFFF?text=VC",
    currentValue: 0.0325,
    changePercent: 1.8,
    raised: 45000,
    goal: 80000,
    category: "Транспорт",
    isPositive: true
  },
  {
    id: 4,
    name: "Пекарня 'BreadMaster'",
    description: "Артизанская пекарня с фокусом на натуральные ингредиенты и традиционные рецепты.",
    symbol: "BRDM",
    logo: "https://via.placeholder.com/150/F39C12/FFFFFF?text=BM",
    currentValue: 0.0198,
    changePercent: -3.2,
    raised: 30000,
    goal: 60000,
    category: "Общепит",
    isPositive: false
  }
];

const TrendingProjects: React.FC = () => {
  const theme = useTheme();
  
  // Расчет процента выполнения цели
  const getProgress = (raised: number, goal: number) => {
    return Math.round((raised / goal) * 100);
  };
  
  // Получить цвет для градиента
  const getProgressColor = (progress: number) => {
    if (progress < 30) return theme.palette.warning.main;
    if (progress < 70) return theme.palette.info.main;
    return theme.palette.success.main;
  };
  
  return (
    <Box sx={{ mb: 6 }}>
      {/* Заголовок блока */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalFireDepartmentIcon 
            sx={{ 
              color: theme.palette.error.main, 
              mr: 1,
              fontSize: '2rem'
            }} 
          />
          <Typography variant="h5" fontWeight="bold" component="h2">
            Трендовые проекты
          </Typography>
        </Box>
        
        <Button 
          component={Link} 
          to="/tokens" 
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 'medium'
          }}
        >
          Смотреть все проекты
        </Button>
      </Box>
      
      {/* Сетка трендовых проектов */}
      <Grid container spacing={3}>
        {trendingProjects.map((project, index) => (
          <Grid item xs={12} md={6} lg={3} key={project.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Paper 
                className="tech-card" 
                sx={{ 
                  p: 0, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderTop: 'none', 
                  borderLeft: 'none',
                  borderRight: 'none'
                }}
              >
                <Box 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Avatar 
                    src={project.logo} 
                    alt={project.name}
                    sx={{ width: 40, height: 40, mr: 1.5 }}
                  />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold"
                      sx={{ 
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {project.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography 
                        variant="caption" 
                        className="tech-text"
                        sx={{ fontWeight: 'medium' }}
                      >
                        {project.symbol}
                      </Typography>
                      
                      <Chip 
                        size="small"
                        label={project.category}
                        sx={{
                          height: 20,
                          fontSize: '0.625rem',
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main
                        }}
                      />
                      
                      {project.changePercent > 5 && (
                        <Chip 
                          size="small"
                          icon={<WhatshotIcon sx={{ fontSize: '0.75rem !important' }} />}
                          label="Hot"
                          sx={{
                            height: 20,
                            fontSize: '0.625rem',
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                            color: theme.palette.error.main
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ flex: 1, p: 0 }}>
                  <TrendingChart 
                    title=""
                    symbol={project.symbol}
                    currentValue={project.currentValue}
                    changePercent={project.changePercent}
                    isPositive={project.isPositive}
                    timeframe="1d"
                  />
                </Box>
                
                <Box sx={{ p: 2, pt: 0 }}>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight="medium">
                        Прогресс
                      </Typography>
                      <Typography variant="body2" className="tech-text">
                        {getProgress(project.raised, project.goal)}%
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        height: 6, 
                        width: '100%', 
                        backgroundColor: alpha(theme.palette.divider, 0.5),
                        borderRadius: 3,
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${getProgress(project.raised, project.goal)}%`,
                          background: `linear-gradient(90deg, ${getProgressColor(getProgress(project.raised, project.goal))}, ${alpha(getProgressColor(getProgress(project.raised, project.goal)), 0.7)})`,
                          borderRadius: 3
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {project.raised.toLocaleString()} ₽ из {project.goal.toLocaleString()} ₽
                    </Typography>
                    
                    <Button
                      component={Link}
                      to={`/tokens/${project.id}`}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        textTransform: 'none',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      Подробнее
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingProjects; 