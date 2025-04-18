import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  alpha, 
  useTheme, 
  Button, 
  IconButton,
  Tabs,
  Tab,
  InputBase,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import PopularProjects from '../components/PopularProjects';
import { useAppSelector } from '../hooks/redux';
import { Project } from '../components/PopularProjects';
import { RootState } from '../store/types';

// Преобразуем текущие данные к интерфейсу Project
const adaptProjectsData = (projects: any[]): Project[] => {
  return projects.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description || '',
    logo: project.logo,
    raised: project.currentValue || 0,
    goal: project.marketCap || 0,
    tokenPrice: project.changePercent || 0,
    currency: 'AVAX',
    category: project.category
  }));
};

// Временные данные для популярных проектов
const mockPopularProjects = [
  {
    id: 'proj-1',
    name: 'Кофейня "CoffeeMania"',
    symbol: 'COFFEE',
    logo: '/assets/project-logos/coffee.png',
    currentValue: 150000,
    changePercent: 12.5,
    category: 'Еда и напитки',
    description: 'Сеть кофеен с уникальными рецептами и атмосферой',
    marketCap: 7500000,
    volume24h: 120000
  },
  {
    id: 'proj-2',
    name: 'Спортивный клуб "FitLife"',
    symbol: 'FITL',
    logo: '/assets/project-logos/gym.png',
    currentValue: 250000,
    changePercent: -3.2,
    category: 'Фитнес',
    description: 'Современный фитнес-клуб с передовым оборудованием',
    marketCap: 12500000,
    volume24h: 350000
  },
  {
    id: 'proj-3',
    name: 'Веб-студия "DigitalFuture"',
    symbol: 'DGFT',
    logo: '/assets/project-logos/webstudio.png',
    currentValue: 320000,
    changePercent: 25.8,
    category: 'IT',
    description: 'Разработка инновационных веб-решений для бизнеса',
    marketCap: 16000000,
    volume24h: 450000
  },
  {
    id: 'proj-4',
    name: 'Доставка здоровой еды "GreenMeal"',
    symbol: 'GRNM',
    logo: '/assets/project-logos/food.png',
    currentValue: 180000,
    changePercent: 8.3,
    category: 'Еда и напитки',
    description: 'Доставка полезных блюд из экологически чистых продуктов',
    marketCap: 9000000,
    volume24h: 220000
  },
  {
    id: 'proj-5',
    name: 'Клиника "MedExpert"',
    symbol: 'MDEX',
    logo: '/assets/project-logos/clinic.png',
    currentValue: 500000,
    changePercent: 5.7,
    category: 'Медицина',
    description: 'Клиника с инновационным подходом к диагностике и лечению',
    marketCap: 25000000,
    volume24h: 600000
  },
  {
    id: 'proj-6',
    name: 'Туристическая компания "TravelDream"',
    symbol: 'TRVD',
    logo: '/assets/project-logos/travel.png',
    currentValue: 210000,
    changePercent: -1.8,
    category: 'Туризм',
    description: 'Организация уникальных путешествий по всему миру',
    marketCap: 10500000,
    volume24h: 280000
  }
];

// Интерфейс для вкладки
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Компонент TabPanel
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`market-tabpanel-${index}`}
      aria-labelledby={`market-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Вспомогательная функция для вкладок
function a11yProps(index: number) {
  return {
    id: `market-tab-${index}`,
    'aria-controls': `market-tabpanel-${index}`,
  };
}

const PopularProjectsPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(mockPopularProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  
  // Используем типизированный хук для доступа к данным Redux
  const user = useAppSelector((state) => state.user?.data);
  
  // Функция для обработки изменения вкладок
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Функция для обработки поиска
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  // Функция для обновления данных
  const handleRefreshData = () => {
    setIsLoading(true);
    
    // Имитация загрузки данных
    setTimeout(() => {
      // Добавляем случайные изменения к текущим значениям
      const updatedProjects = projects.map(project => {
        const randomChange = (Math.random() * 10 - 5) / 100; // от -5% до +5%
        const newChangePercent = Math.max(-30, Math.min(30, project.changePercent + randomChange * 100));
        const valueChange = project.currentValue * randomChange;
        
        return {
          ...project,
          currentValue: project.currentValue + valueChange,
          changePercent: parseFloat(newChangePercent.toFixed(2))
        };
      });
      
      setProjects(updatedProjects);
      setIsLoading(false);
    }, 1000);
  };
  
  // Фильтрация проектов по поисковому запросу
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Сортировка проектов в зависимости от выбранной вкладки
  const sortedProjects = React.useMemo(() => {
    // Сначала адаптируем данные к нужному формату
    return adaptProjectsData(
      [...filteredProjects].sort((a, b) => {
        switch(tabValue) {
          case 0: // Trending
            return Math.abs(b.changePercent) - Math.abs(a.changePercent);
          case 1: // Top Gainers
            return b.changePercent - a.changePercent;
          case 2: // Top Losers
            return a.changePercent - b.changePercent;
          case 3: // Market Cap
            return b.marketCap - a.marketCap;
          case 4: // Volume
            return b.volume24h - a.volume24h;
          default:
            return 0;
        }
      })
    );
  }, [filteredProjects, tabValue]);
  
  // Анимация для контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  // Анимация для заголовка
  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Заголовок страницы */}
        <motion.div variants={headerVariants}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4
          }}>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight="bold"
              sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(theme.palette.secondary.main, 0.8)})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Популярные проекты
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small"
                onClick={handleRefreshData}
                sx={{ 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) }
                }}
              >
                <RefreshIcon 
                  sx={{ 
                    animation: isLoading ? 'spin 1s linear infinite' : 'none',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }}
                />
              </IconButton>
              
              <IconButton 
                size="small"
                onClick={() => setShowFilter(!showFilter)}
                sx={{ 
                  backgroundColor: showFilter 
                    ? alpha(theme.palette.primary.main, 0.2)
                    : alpha(theme.palette.primary.main, 0.1),
                  '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) }
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Box>
          </Box>
        </motion.div>
        
        {/* Панель поиска */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          sx={{ mb: 3 }}
        >
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              borderRadius: 2,
              boxShadow: theme.shadows[2],
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(8px)'
            }}
          >
            <IconButton sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Поиск проектов..."
              inputProps={{ 'aria-label': 'поиск проектов' }}
              value={searchTerm}
              onChange={handleSearch}
            />
          </Paper>
        </Box>
        
        {/* Вкладки для сортировки */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0'
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: theme.typography.fontWeightMedium,
                fontSize: theme.typography.pxToRem(15),
                minWidth: 100,
                '&.Mui-selected': {
                  fontWeight: theme.typography.fontWeightBold
                }
              }
            }}
          >
            <Tab label="Популярные" {...a11yProps(0)} />
            <Tab label="Растущие" {...a11yProps(1)} />
            <Tab label="Падающие" {...a11yProps(2)} />
            <Tab label="Капитализация" {...a11yProps(3)} />
            <Tab label="Объем торгов" {...a11yProps(4)} />
          </Tabs>
        </Box>
        
        {/* Контент вкладок */}
        <TabPanel value={tabValue} index={0}>
          <PopularProjects 
            projects={sortedProjects}
            category={searchTerm || 'все'}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <PopularProjects 
            projects={sortedProjects}
            category={searchTerm || 'растущие'}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <PopularProjects 
            projects={sortedProjects}
            category={searchTerm || 'падающие'}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <PopularProjects 
            projects={sortedProjects}
            category={searchTerm || 'по капитализации'}
          />
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <PopularProjects 
            projects={sortedProjects}
            category={searchTerm || 'по объему'}
          />
        </TabPanel>
      </motion.div>
    </Container>
  );
};

export default PopularProjectsPage; 