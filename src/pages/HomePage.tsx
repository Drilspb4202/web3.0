import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  useTheme, 
  Paper, 
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PopularProjects from '../components/PopularProjects';
import CategorySelector from '../components/CategorySelector';
import { useNavigate } from 'react-router-dom';
import CustomFooter from '../components/CustomFooter';

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
      {/* Hero секция */}
      <HeroSection />
      
      {/* Популярные проекты */}
      <Box sx={{ mt: -6, position: 'relative', zIndex: 5 }}>
        <Container maxWidth="lg">
          <PopularProjects 
            projects={popularProjects} 
            title="Популярные проекты" 
            subtitle="Инвестируйте в самые перспективные бизнесы на нашей платформе"
            maxShow={3}
          />
        </Container>
      </Box>
      
      {/* Секция с преимуществами */}
      <FeaturesSection />
      
      {/* Секция с шагами для инвесторов */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Box 
            component="section"
            sx={{ 
              position: 'relative',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
              borderRadius: 4,
              p: { xs: 4, md: 6 },
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                opacity: 0.05,
                zIndex: 0,
                background: 'url(/images/pattern-dots.svg) repeat',
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <PopularProjects 
                projects={popularProjects.slice().reverse()} 
                title="Готовятся к запуску" 
                subtitle="Новые проекты, которые скоро будут доступны для инвестирования"
                maxShow={2}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Футер */}
      <CustomFooter />
    </Box>
  );
};

export default HomePage; 