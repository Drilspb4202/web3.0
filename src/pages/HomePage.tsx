import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  useTheme, 
  Paper, 
  Divider,
  alpha,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PopularProjects from '../components/PopularProjects';
import CategorySelector from '../components/CategorySelector';
import { useNavigate } from 'react-router-dom';
import CustomFooter from '../components/CustomFooter';
import CountdownTimer from '../components/CountdownTimer';
import CryptoChart from '../components/CryptoChart';
import ICOFactsGrid from '../components/ICOFactsGrid';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PhotoGallery from '../components/PhotoGallery';

// Задаем дату запуска Чиху коина (через месяц от текущей даты)
const getLaunchDate = (): Date => {
  const today = new Date();
  return new Date(today.setMonth(today.getMonth() + 1));
};

// Список категорий для селектора
const categories = [
  { id: 'all', name: 'Все категории' },
  { id: 'food', name: 'Еда и напитки' },
  { id: 'tech', name: 'Технологии' },
  { id: 'health', name: 'Здоровье' },
  { id: 'education', name: 'Образование' },
  { id: 'retail', name: 'Розничная торговля' }
];

// Временные данные для популярных проектов
const popularProjects = [
  {
    id: "1",
    name: "Кофейня 'CoffeeMania'",
    description: "Сеть уютных кофеен в бизнес-центрах с уникальными сортами кофе и быстрым обслуживанием",
    logo: "https://via.placeholder.com/150/8E44AD/FFFFFF?text=CM",
    raised: 70000,
    goal: 100000,
    tokenPrice: 0.05,
    currency: "AVAX",
    category: "Общепит"
  },
  {
    id: "2",
    name: "Прокат велосипедов 'ВелоCity'",
    description: "Прокат электровелосипедов в центре города с приложением для отслеживания и удобной оплатой",
    logo: "https://via.placeholder.com/150/3498DB/FFFFFF?text=VC",
    raised: 45000,
    goal: 80000,
    tokenPrice: 0.03,
    currency: "AVAX",
    category: "Транспорт"
  },
  {
    id: "3",
    name: "Фитнес-центр 'PowerZone'",
    description: "Современный фитнес-центр с новейшим оборудованием и профессиональными тренерами",
    logo: "https://via.placeholder.com/150/E74C3C/FFFFFF?text=PZ",
    raised: 125000,
    goal: 150000,
    tokenPrice: 0.08,
    currency: "AVAX",
    category: "Спорт"
  },
  {
    id: "4",
    name: "Пекарня 'BreadMaster'",
    description: "Артизанская пекарня с фокусом на натуральные ингредиенты и традиционные рецепты",
    logo: "https://via.placeholder.com/150/F39C12/FFFFFF?text=BM",
    raised: 30000,
    goal: 60000,
    tokenPrice: 0.02,
    currency: "AVAX",
    category: "Общепит"
  }
];

// Статистические данные (в реальном приложении будут загружаться из API)
const statisticsData = [
  { label: 'Инвесторов', value: '10,500+', icon: 'people' },
  { label: 'Проектов', value: '250+', icon: 'business' },
  { label: 'Инвестировано', value: '₽250M+', icon: 'money' },
  { label: 'Средняя доходность', value: '18.5%', icon: 'trending_up' }
];

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(popularProjects);
  
  // Фильтрация проектов при изменении категории
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(popularProjects);
    } else {
      setFilteredProjects(
        popularProjects.filter(project => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);
  
  // Функция для перехода на страницу с проектами
  const handleViewAllProjects = () => {
    navigate('/projects');
  };
  
  // Анимация для элементов страницы при первом рендере
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero секция с компонентом HeroSection */}
      <HeroSection />
      
      {/* Секция с преимуществами */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h2" fontWeight="bold" color="primary.main" gutterBottom>
                  Революция в инвестировании в малый бизнес
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 3, color: 'text.secondary', fontSize: '1.1rem' }}>
                  Chihuahua Capital позволяет предпринимателям привлекать инвестиции, 
                  а инвесторам - получать прибыль от успешных проектов малого бизнеса.
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {statisticsData.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper 
                        elevation={1} 
                        sx={{ 
                          p: 2, 
                          textAlign: 'center',
                          background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.05) 0%, rgba(156, 39, 176, 0.1) 100%)',
                          borderRadius: 2,
                          height: '100%'
                        }}
                      >
                        <Typography variant="h4" fontWeight="bold" color="primary.main">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                
                <Button 
                  variant="contained" 
                  color="primary"
                  size="large"
                  onClick={() => navigate('/exchange')}
                  sx={{ 
                    borderRadius: 2,
                    py: 1.5,
                    px: 4
                  }}
                >
                  Начать инвестировать
                </Button>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box
                    component="img"
                    src="/images/chihuahua-token.jpg"
                    alt="Chihuahua Token"
                    sx={{
                      width: '100%',
                      borderRadius: 4,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      transform: 'rotate(-2deg)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'rotate(0deg) scale(1.02)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                      }
                    }}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Секция с популярными проектами */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography variant="h3" component="h2" fontWeight="bold" textAlign="center" gutterBottom>
                  Популярные проекты
                </Typography>
                <Typography 
                  variant="body1" 
                  textAlign="center" 
                  color="text.secondary" 
                  sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
                >
                  Ознакомьтесь с самыми популярными проектами на нашей платформе, которые уже получили поддержку инвесторов
                </Typography>
              </motion.div>
            </Grid>
            
            <Grid item xs={12}>
              <CategorySelector 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onChange={setSelectedCategory} 
              />
            </Grid>
            
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <PopularProjects projects={filteredProjects} />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={handleViewAllProjects}
                    sx={{ 
                      borderRadius: 2,
                      py: 1.5,
                      px: 4
                    }}
                  >
                    Смотреть все проекты
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Секция с информацией о токене */}
      <Box
        sx={{
          py: 10,
          background: theme.palette.mode === 'dark' 
            ? '#141E30' 
            : 'white',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h2" 
              component="h2" 
              align="center" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                mb: 1,
                background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              О Чиху коине
            </Typography>
            
            <Typography 
              variant="h6" 
              component="p" 
              align="center" 
              color="text.secondary" 
              sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
            >
              Все, что вам нужно знать о нашем токене и предстоящем первичном размещении
            </Typography>
          </motion.div>
          
          <ICOFactsGrid />
        </Container>
      </Box>
      
      {/* Фото галерея */}
      <PhotoGallery 
        title="Галерея Chihuahua Capital" 
        subtitle="Посмотрите на наши разработки и достижения в области токенизации малого бизнеса"
      />
      
      {/* Countdown секция */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #24243e 0%, #302b63 50%, #0f0c29 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Декоративный фон */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
            zIndex: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Typography variant="h3" component="h2" fontWeight="bold" gutterBottom>
                  Запуск ChihuahuaCoin
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  Наш собственный токен будет запущен совсем скоро! Не пропустите возможность
                  стать одним из первых держателей ChihuahuaCoin.
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <CountdownTimer launchDate={getLaunchDate()} />
                </Box>
                
                <Button 
                  variant="contained" 
                  sx={{ 
                    background: 'linear-gradient(45deg, #FF8E53 0%, #FE6B8B 100%)',
                    color: 'white',
                    borderRadius: 2,
                    py: 1.5,
                    px: 4,
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FE6B8B 0%, #FF8E53 100%)',
                    }
                  }}
                >
                  Получить уведомление
                </Button>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.7,
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                <Box
                  component="img"
                  src="/images/chihuahua-coin.jpeg"
                  alt="Chihuahua Coin"
                  sx={{
                    width: '100%',
                    borderRadius: '50%',
                    boxShadow: '0 0 50px rgba(254, 107, 139, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'rotate(5deg)',
                      boxShadow: '0 0 70px rgba(254, 107, 139, 0.6)'
                    }
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Футер */}
      <CustomFooter />
    </Box>
  );
};

export default HomePage; 