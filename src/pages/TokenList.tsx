import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Button,
  Chip,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Tooltip,
  IconButton,
  Pagination,
  Stack,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TextField,
  Badge,
  Container,
  styled,
  CardMedia,
  CardActions,
  Tabs,
  Tab,
  LinearProgress
} from '@mui/material';
import { Web3Context } from '../contexts/Web3Context';
import { getTokensCount, getTokensInfo, TokenInfo } from '../services/tokenFactory';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FiltersBar from '../components/FiltersBar';
import TokenCard from '../components/TokenCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingIcon from '@mui/icons-material/Pending';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteButton from '../components/FavoriteButton';
import NotificationsMenu from '../components/NotificationsMenu';
import ProjectCompare from '../components/ProjectCompare';
import FavoritesList from '../components/FavoritesList';
import FavoriteService from '../services/favoriteService';
import NotificationService from '../services/notificationService';
import { Project } from '../types';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Item animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
  position: 'relative',
  minHeight: 'calc(100vh - 64px)',
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'var(--input-bg)',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--border-color)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const PageHeading = styled(motion.div)({
  marginBottom: '24px',
  textAlign: 'center',
});

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    fontWeight: 500,
  },
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

// Данные для текущих проектов
const activeProjects = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

// Данные для будущих проектов
const upcomingProjects = [
  {
    id: 101,
    name: "Доставка здоровой еды 'GreenMeal'",
    description: "Сервис доставки персонализированных здоровых обедов для офисных работников",
    logo: "https://via.placeholder.com/150/27AE60/FFFFFF?text=GM",
    status: "На рассмотрении", // "На рассмотрении" или "Готовится выпуск"
    category: "Общепит"
  },
  {
    id: 102,
    name: "Школа программирования 'CodeAcademy'",
    description: "Интенсивные курсы программирования с гарантированным трудоустройством",
    logo: "https://via.placeholder.com/150/9B59B6/FFFFFF?text=CA",
    status: "Готовится выпуск",
    category: "Образование"
  },
  {
    id: 103,
    name: "Экотуризм 'NatureExplorer'",
    description: "Организация экологических туров в уникальные природные места",
    logo: "https://via.placeholder.com/150/2ECC71/FFFFFF?text=NE",
    status: "На рассмотрении",
    category: "Туризм"
  }
];

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
      id={`projects-tabpanel-${index}`}
      aria-labelledby={`projects-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const TokenList: React.FC = () => {
  const { account, isLocalNode, networkName } = useContext(Web3Context);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');
  const [totalCount, setTotalCount] = useState(0);
  
  // Пагинация
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  // Фильтр и поиск
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTokens, setFilteredTokens] = useState<TokenInfo[]>([]);
  const [sortFilter, setSortFilter] = useState('newest');
  
  const [tabValue, setTabValue] = useState(0);
  
  // Состояние для избранных проектов
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  
  useEffect(() => {
    const getTokens = async () => {
      try {
        setLoading(true);
        const fetchedTokens = await fetchTokens();
        setTokens(fetchedTokens);
        setFilteredTokens(fetchedTokens);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch tokens:', error);
        setError('Failed to load tokens. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    getTokens();
  }, [account]);
  
  useEffect(() => {
    // Фильтрация токенов по поиску
    const filtered = tokens.filter(token => 
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.tokenAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTokens(filtered);
    setPage(1); // Сбрасываем на первую страницу при поиске
  }, [searchQuery, tokens]);

  useEffect(() => {
    let result = [...filteredTokens];
    
    // Apply sort filter
    if (sortFilter === 'newest') {
      result = result.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
    } else if (sortFilter === 'oldest') {
      result = result.sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
    } else if (sortFilter === 'name') {
      result = result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredTokens(result);
    setTotalCount(result.length);
    setPage(1);
  }, [searchQuery, filteredTokens, sortFilter]);

  const fetchTokens = async (): Promise<TokenInfo[]> => {
    // В реальном приложении это был бы запрос к API или смарт-контракту
    try {
      return await getTokensInfo();
    } catch (error) {
      console.error("Error fetching tokens:", error);
      return [];
    }
  };
  
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.info('Адрес скопирован', { autoClose: 2000 });
  };
  
  const handleRefresh = () => {
    fetchTokens();
    toast.info('Список токенов обновлен', { autoClose: 2000 });
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };
  
  const getBlockExplorerLink = (address: string) => {
    if (isLocalNode) return '#';
    return `https://testnet.snowtrace.io/token/${address}`;
  };
  
  // Токены для текущей страницы с учётом фильтрации
  const currentTokens = filteredTokens.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredTokens.length / itemsPerPage);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortFilter(value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'var(--warning-color)';
    if (progress < 70) return 'var(--info-color)';
    return 'var(--success-color)';
  };
  
  // Преобразуем данные проектов в формат Project
  const mappedActiveProjects: Project[] = activeProjects.map(project => ({
    ...project,
    isFavorite: FavoriteService.isFavorite(project.id)
  }));
  
  const mappedUpcomingProjects: Project[] = upcomingProjects.map(project => ({
    ...project,
    isFavorite: FavoriteService.isFavorite(project.id)
  }));
  
  // Все проекты для сравнения
  const allProjects = [...mappedActiveProjects, ...mappedUpcomingProjects];
  
  // Обработчик добавления проекта в сравнение
  const handleAddToCompare = (projectId: number) => {
    if (selectedForCompare.includes(projectId)) {
      // Если проект уже в сравнении, удаляем
      setSelectedForCompare(prev => prev.filter(id => id !== projectId));
    } else {
      // Иначе добавляем, но не более 4 проектов
      if (selectedForCompare.length < 4) {
        setSelectedForCompare(prev => [...prev, projectId]);
        
        // Создаем уведомление о добавлении в сравнение
        NotificationService.addNotification({
          title: 'Проект добавлен к сравнению',
          message: 'Проект был добавлен в список сравнения',
          type: 'info',
          projectId
        });
      } else {
        // Уведомление о превышении лимита
        toast.warning('Можно сравнивать не более 4 проектов одновременно', { autoClose: 3000 });
      }
    }
  };
  
  // Обработчик удаления проекта из сравнения
  const handleRemoveFromCompare = (projectId: number) => {
    setSelectedForCompare(prev => prev.filter(id => id !== projectId));
  };
  
  // Очистка списка сравнения
  const handleClearCompare = () => {
    setSelectedForCompare([]);
  };
  
  // Обработчик добавления/удаления из избранного
  const handleToggleFavorite = (projectId: number, isFavorite: boolean) => {
    // Создаем уведомление при добавлении в избранное
    if (isFavorite) {
      NotificationService.addNotification({
        title: 'Проект добавлен в избранное',
        message: 'Проект был добавлен в список избранных',
        type: 'success',
        projectId
      });
    }
  };
  
  if (!account) {
    return (
      <Box className="fade-in" sx={{ my: 4 }}>
        <Card 
          elevation={3} 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box sx={{ 
            height: '8px', 
            width: '100%', 
            background: 'var(--gradient-primary)'
          }} />
          
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h5" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <AccountBalanceWalletIcon sx={{ mr: 1, color: 'var(--primary-color)' }} />
              Требуется подключение
            </Typography>
            
            <Alert 
              severity="warning" 
              variant="outlined"
              sx={{ 
                mt: 2, 
                borderRadius: 'var(--radius-md)'
              }}
            >
              Пожалуйста, подключите ваш кошелек, чтобы просматривать созданные токены.
            </Alert>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  textTransform: 'none',
                  '&:hover': {
                    boxShadow: 'var(--shadow-lg)',
                  }
                }}
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
              >
                Вернуться на главную
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
  
  return (
    <StyledContainer>
      <PageHeading
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            background: 'var(--text-gradient)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Проекты для инвестирования
        </Typography>
        <Typography 
          variant="body1" 
          color="textSecondary" 
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Изучите проекты на нашей платформе и инвестируйте в будущие бизнес-звезды
        </Typography>
      </PageHeading>

      <Paper elevation={0} sx={{ borderRadius: 'var(--radius-lg)', mb: 4 }}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="project tabs"
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{ 
              '& .MuiTab-root': { 
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                py: 2
              }
            }}
          >
            <Tab label="Текущие проекты" id="projects-tab-0" />
            <Tab label="Будущие проекты" id="projects-tab-1" />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Избранное
                  {FavoriteService.getFavoriteIds().length > 0 && (
                    <Badge 
                      badgeContent={FavoriteService.getFavoriteIds().length} 
                      color="error" 
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              } 
              id="projects-tab-2" 
            />
          </Tabs>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsMenu />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4, alignItems: 'center', justifyContent: 'space-between' }}>
        <SearchField
          placeholder="Search by name, symbol or address"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: { md: 400 } }}
        />
        
        <FiltersBar onSortChange={handleSortChange} sortValue={sortFilter} />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : filteredTokens.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Alert severity="info" sx={{ mb: 4 }}>
            No tokens found matching your criteria. Try adjusting your search.
          </Alert>
        </motion.div>
      ) : (
        <>
          <TabPanel value={tabValue} index={0}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
                {activeProjects.map((project) => {
                  const progress = Math.round((project.raised / project.goal) * 100);
                  const isInCompare = selectedForCompare.includes(project.id);
                  const isFavorite = FavoriteService.isFavorite(project.id);
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                      <motion.div variants={itemVariants}>
                        <Card 
                          className="card-hover" 
                          sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-md)',
                            position: 'relative',
                            border: isInCompare ? '2px solid var(--primary-color)' : 'none'
                          }}
                        >
                          <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', gap: 1 }}>
                            <FavoriteButton 
                              projectId={project.id}
                              initialFavorite={isFavorite}
                              onToggle={(isFav) => handleToggleFavorite(project.id, isFav)}
                            />
                            
                            <Tooltip title={isInCompare ? "Убрать из сравнения" : "Добавить к сравнению"}>
                              <IconButton 
                                size="small"
                                color={isInCompare ? "primary" : "default"}
                                onClick={() => handleAddToCompare(project.id)}
                                sx={{ 
                                  bgcolor: 'rgba(255,255,255,0.8)',
                                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                }}
                              >
                                <CompareArrowsIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box sx={{ position: 'relative' }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={`https://source.unsplash.com/random/600x200/?${project.category.toLowerCase()},business`}
                              alt={project.name}
                            />
                            <Avatar
                              src={project.logo}
                              alt={project.name}
                              sx={{
                                width: 70,
                                height: 70,
                                position: 'absolute',
                                bottom: -30,
                                left: 20,
                                border: '4px solid white',
                                boxShadow: 'var(--shadow-md)'
                              }}
                            />
                          </Box>
                          
                          <CardContent sx={{ pt: 4, pb: 2, px: 3, flexGrow: 1 }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {project.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {project.description}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ mt: 'auto' }}>
                              <Box sx={{ mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                  <Typography variant="body2" fontWeight="bold">
                                    Сбор средств:
                                  </Typography>
                                  <Typography variant="body2">
                                    {progress}%
                                  </Typography>
                                </Box>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={progress} 
                                  sx={{ 
                                    height: 8, 
                                    borderRadius: 4,
                                    bgcolor: 'rgba(0,0,0,0.05)',
                                    '& .MuiLinearProgress-bar': {
                                      backgroundColor: getProgressColor(progress)
                                    }
                                  }} 
                                />
                              </Box>
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Собрано: <strong>{project.raised.toLocaleString()} ₽</strong>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Цель: <strong>{project.goal.toLocaleString()} ₽</strong>
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Chip 
                                  label={`${project.tokenPrice} ${project.currency}`}
                                  color="primary"
                                  size="small"
                                  icon={<LocalAtmIcon />}
                                  sx={{ fontWeight: 'bold' }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  Токенов: {Math.round(project.goal / project.tokenPrice).toLocaleString()}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                          
                          <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <Button 
                              size="small" 
                              component={Link} 
                              to={`/tokens/${project.id}`}
                              sx={{ textTransform: 'none' }}
                            >
                              Подробнее
                            </Button>
                            <Button 
                              variant="contained" 
                              size="medium"
                              sx={{ 
                                background: 'var(--gradient-primary)',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                px: 3,
                                '&:hover': {
                                  boxShadow: 'var(--shadow-lg)'
                                }
                              }}
                            >
                              Инвестировать
                            </Button>
                          </CardActions>
                        </Card>
                      </motion.div>
                  </Grid>
                  )
                })}
            </Grid>
          </motion.div>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
              <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid container spacing={3}>
                {upcomingProjects.map((project) => {
                  const isInCompare = selectedForCompare.includes(project.id);
                  const isFavorite = FavoriteService.isFavorite(project.id);
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                      <motion.div variants={itemVariants}>
                        <Card 
                          className="card-hover" 
                          sx={{ 
                            height: '100%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-md)',
                            opacity: 0.85,
                            position: 'relative',
                            border: isInCompare ? '2px solid var(--primary-color)' : 'none'
                          }}
                        >
                          <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', gap: 1 }}>
                            <FavoriteButton 
                              projectId={project.id}
                              initialFavorite={isFavorite}
                              onToggle={(isFav) => handleToggleFavorite(project.id, isFav)}
                            />
                            
                            <Tooltip title={isInCompare ? "Убрать из сравнения" : "Добавить к сравнению"}>
                              <IconButton 
                                size="small"
                                color={isInCompare ? "primary" : "default"}
                                onClick={() => handleAddToCompare(project.id)}
                                sx={{ 
                                  bgcolor: 'rgba(255,255,255,0.8)',
                                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                                }}
                              >
                                <CompareArrowsIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box sx={{ position: 'relative' }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={`https://source.unsplash.com/random/600x200/?${project.category.toLowerCase()},startup`}
                              alt={project.name}
                              sx={{ filter: 'grayscale(30%)' }}
                            />
                            <Avatar
                              src={project.logo}
                              alt={project.name}
                              sx={{
                                width: 70,
                                height: 70,
                                position: 'absolute',
                                bottom: -30,
                                left: 20,
                                border: '4px solid white',
                                boxShadow: 'var(--shadow-md)'
                              }}
                            />
                          </Box>
                          
                          <CardContent sx={{ pt: 4, pb: 2, px: 3, flexGrow: 1 }}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {project.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {project.description}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ mt: 'auto' }}>
                              <Chip 
                                icon={project.status === "На рассмотрении" ? <PendingIcon /> : <HourglassEmptyIcon />}
                                label={project.status}
                                color={project.status === "На рассмотрении" ? "secondary" : "primary"}
                                sx={{ 
                                  fontWeight: 'bold',
                                  mt: 2
                                }}
                              />
                            </Box>
                          </CardContent>
                          
                          <CardActions sx={{ p: 2, pt: 0 }}>
                            <Button 
                              variant="outlined" 
                              color="primary" 
                              size="medium"
                              startIcon={<InfoOutlinedIcon />}
                              sx={{ 
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: 'var(--radius-md)'
                              }}
                              fullWidth
                            >
                              Узнать больше
                            </Button>
                          </CardActions>
                        </Card>
                      </motion.div>
                    </Grid>
                  )
                })}
              </Grid>
            </motion.div>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <FavoritesList 
              projects={allProjects} 
              onRemoveFromFavorites={() => {
                // Обновить интерфейс после удаления из избранного
                setTabValue(tabValue);
              }}
            />
          </TabPanel>

          {account && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: 6,
                mb: 4
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                component={Link}
                to="/create-token"
                sx={{
                  background: 'var(--gradient-secondary)',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  boxShadow: 'var(--shadow-md)',
                  '&:hover': {
                    boxShadow: 'var(--shadow-lg)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Создать новый проект
              </Button>
            </Box>
          )}
          
          {/* Компонент сравнения проектов */}
          <ProjectCompare 
            projects={allProjects}
            selectedProjects={selectedForCompare}
            onRemoveProject={handleRemoveFromCompare}
            onClearAll={handleClearCompare}
          />
        </>
      )}
    </StyledContainer>
  );
};

export default TokenList; 