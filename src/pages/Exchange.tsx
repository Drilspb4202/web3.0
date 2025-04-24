import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Chip,
  Avatar,
  Divider,
  useTheme,
  alpha,
  styled
} from '@mui/material';
import { motion } from 'framer-motion';

// Иконки
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Компоненты
import MarketSummary from '../components/MarketSummary';
import TrendingChart from '../components/TrendingChart';
import { Web3Context } from '../contexts/Web3Context';

// Интерфейсы
interface TokenMarketData {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  priceChange24h: number;
  isPositive: boolean;
  volume24h: number;
  marketCap: number;
  verified: boolean;
  favorite?: boolean;
}

// Пример данных рынка
const marketStats = [
  { 
    id: 'market-cap', 
    title: 'Рыночная капитализация', 
    value: 12500000,
    formattedValue: '12.5 млн ₽', 
    change: 3.2, 
    isPositive: true,
    tooltip: 'Суммарная стоимость всех токенов на платформе'
  },
  { 
    id: 'trading-volume', 
    title: 'Объем торгов (24ч)', 
    value: 4750000,
    formattedValue: '4.75 млн ₽', 
    change: 5.7, 
    isPositive: true,
    tooltip: 'Суммарный объем всех торгов за последние 24 часа' 
  },
  { 
    id: 'active-tokens', 
    title: 'Активные токены', 
    value: 58,
    formattedValue: '58', 
    change: 2.1, 
    isPositive: true,
    tooltip: 'Количество токенов с трейдинговой активностью за последние 24ч'
  },
  { 
    id: 'average-yield', 
    title: 'Средняя доходность', 
    value: 18.5,
    formattedValue: '18.5%', 
    change: -0.8, 
    isPositive: false,
    tooltip: 'Средняя доходность инвестиций в токены за последние 30 дней' 
  }
];

// Пример трендовых токенов
const trendingTokens = [
  {
    id: "1",
    name: "CoffeeMania",
    symbol: "CMN",
    price: 123500,
    changePercent: 8.45,
    isPositive: true
  },
  {
    id: "2",
    name: "VeloCity",
    symbol: "VLC",
    price: 75300,
    changePercent: 4.27,
    isPositive: true
  },
  {
    id: "3",
    name: "PowerZone",
    symbol: "PWZ",
    price: 224800,
    changePercent: -2.31,
    isPositive: false
  },
  {
    id: "4",
    name: "BreadMaster",
    symbol: "BMS",
    price: 42100,
    changePercent: 12.75,
    isPositive: true
  }
];

// Пример токенов для списка
const mockTokens: TokenMarketData[] = [
  {
    id: "1",
    name: "CoffeeMania",
    symbol: "CMN",
    logo: "https://via.placeholder.com/40/8E44AD/FFFFFF?text=CM",
    price: 123500,
    priceChange24h: 8.45,
    isPositive: true,
    volume24h: 2450000,
    marketCap: 12350000,
    verified: true
  },
  {
    id: "2",
    name: "VeloCity",
    symbol: "VLC",
    logo: "https://via.placeholder.com/40/3498DB/FFFFFF?text=VC",
    price: 75300,
    priceChange24h: 4.27,
    isPositive: true,
    volume24h: 876000,
    marketCap: 6024000,
    verified: true
  },
  {
    id: "3",
    name: "PowerZone",
    symbol: "PWZ",
    logo: "https://via.placeholder.com/40/E74C3C/FFFFFF?text=PZ",
    price: 224800,
    priceChange24h: -2.31,
    isPositive: false,
    volume24h: 1235000,
    marketCap: 14720000,
    verified: true
  },
  {
    id: "4",
    name: "BreadMaster",
    symbol: "BMS",
    logo: "https://via.placeholder.com/40/F39C12/FFFFFF?text=BM",
    price: 42100,
    priceChange24h: 12.75,
    isPositive: true,
    volume24h: 634000,
    marketCap: 2526000,
    verified: true
  },
  {
    id: "5",
    name: "GreenMeal",
    symbol: "GME",
    logo: "https://via.placeholder.com/40/27AE60/FFFFFF?text=GM",
    price: 55200,
    priceChange24h: -1.75,
    isPositive: false,
    volume24h: 328000,
    marketCap: 3312000,
    verified: false
  },
  {
    id: "6",
    name: "CodeAcademy",
    symbol: "CODE",
    logo: "https://via.placeholder.com/40/9B59B6/FFFFFF?text=CA",
    price: 97800,
    priceChange24h: 3.64,
    isPositive: true,
    volume24h: 546000,
    marketCap: 7824000,
    verified: true
  },
  {
    id: "7",
    name: "NatureExplorer",
    symbol: "NEXP",
    logo: "https://via.placeholder.com/40/2ECC71/FFFFFF?text=NE",
    price: 31400,
    priceChange24h: 5.23,
    isPositive: true,
    volume24h: 185000,
    marketCap: 1884000,
    verified: false
  },
  {
    id: "8",
    name: "SkyFitness",
    symbol: "SKYF",
    logo: "https://via.placeholder.com/40/1ABC9C/FFFFFF?text=SF",
    price: 64500,
    priceChange24h: -0.87,
    isPositive: false,
    volume24h: 423000,
    marketCap: 5160000,
    verified: true
  }
];

// Стилизованные компоненты
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

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 700,
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.paper, 0.7)
    : alpha(theme.palette.background.paper, 0.7),
  position: 'sticky',
  top: 0,
  zIndex: 2,
  backdropFilter: 'blur(10px)',
  whiteSpace: 'nowrap',
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: alpha(theme.palette.action.hover, 0.1),
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.action.hover, 0.1),
    cursor: 'pointer',
  },
  '&:nth-of-type(even)': {
    backgroundColor: alpha(theme.palette.action.hover, 0.05),
  },
}));

// Основной компонент страницы Биржи
const Exchange: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { account, connectWallet } = useContext(Web3Context);
  
  // Состояния
  const [tabValue, setTabValue] = useState(0);
  const [tokens, setTokens] = useState<TokenMarketData[]>(mockTokens);
  const [filteredTokens, setFilteredTokens] = useState<TokenMarketData[]>(mockTokens);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'ascending' | 'descending'}>({
    key: 'marketCap',
    direction: 'descending'
  });
  const [favoriteTokens, setFavoriteTokens] = useState<string[]>([]);
  
  // Функция для форматирования цены
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Функция для форматирования объемов
  const formatVolume = (volume: number): string => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(2)} млн ₽`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(0)} тыс ₽`;
    }
    return `${volume} ₽`;
  };
  
  // Обработчик смены вкладок
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    filterTokens(newValue, searchQuery);
  };
  
  // Обработчик поиска
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterTokens(tabValue, query);
  };
  
  // Фильтрация токенов
  const filterTokens = (tab: number, query: string) => {
    let filtered = [...tokens];
    
    // Фильтрация по вкладке
    if (tab === 1) { // Избранное
      filtered = filtered.filter(token => favoriteTokens.includes(token.id));
    } else if (tab === 2) { // Верифицированные
      filtered = filtered.filter(token => token.verified);
    } else if (tab === 3) { // Растущие
      filtered = filtered.filter(token => token.isPositive);
    } else if (tab === 4) { // Падающие
      filtered = filtered.filter(token => !token.isPositive);
    }
    
    // Фильтрация по поисковому запросу
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(token => 
        token.name.toLowerCase().includes(lowerQuery) || 
        token.symbol.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Сортировка
    filtered = sortTokens(filtered);
    
    setFilteredTokens(filtered);
  };
  
  // Сортировка токенов
  const sortTokens = (tokensToSort: TokenMarketData[]): TokenMarketData[] => {
    const sorted = [...tokensToSort].sort((a, b) => {
      let aValue = a[sortConfig.key as keyof TokenMarketData];
      let bValue = b[sortConfig.key as keyof TokenMarketData];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        aValue = aValue as number;
        bValue = bValue as number;
        return sortConfig.direction === 'ascending' 
          ? aValue - bValue
          : bValue - aValue;
      }
    });
    
    return sorted;
  };
  
  // Обработчик сортировки
  const handleSort = (key: string) => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending';
    
    setSortConfig({ key, direction });
  };
  
  // Обработчик добавления/удаления из избранного
  const handleToggleFavorite = (tokenId: string) => {
    setFavoriteTokens(prev => {
      if (prev.includes(tokenId)) {
        return prev.filter(id => id !== tokenId);
      } else {
        return [...prev, tokenId];
      }
    });
  };
  
  // Обработчик перехода на страницу деталей токена
  const handleTokenDetails = (tokenId: string) => {
    navigate(`/tokens/${tokenId}`);
  };
  
  // Обработчик обновления данных
  const handleRefreshData = () => {
    // Здесь будет логика обновления данных с API
    // Пока просто имитируем
    const updatedTokens = [...tokens].map(token => {
      const changePercent = token.priceChange24h + (Math.random() * 2 - 1);
      const isPositive = changePercent > 0;
      const priceChange = token.price * changePercent / 100;
      
      return {
        ...token,
        price: token.price + priceChange,
        priceChange24h: parseFloat(changePercent.toFixed(2)),
        isPositive
      };
    });
    
    setTokens(updatedTokens);
    filterTokens(tabValue, searchQuery);
  };
  
  // Эффект для сортировки при изменении конфигурации сортировки
  useEffect(() => {
    setFilteredTokens(sortTokens(filteredTokens));
  }, [sortConfig]);
  
  // Получение иконки сортировки
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    
    return sortConfig.direction === 'ascending' 
      ? <Box component="span" sx={{ fontSize: '0.8rem', ml: 0.5 }}>▲</Box> 
      : <Box component="span" sx={{ fontSize: '0.8rem', ml: 0.5 }}>▼</Box>;
  };
  
  // Анимация появления контейнера
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };
  
  // Анимация появления элементов
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Заголовок страницы */}
        <motion.div variants={itemVariants}>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold" 
            sx={{ mb: 1 }}
          >
            Торговая площадка
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            Инвестируйте в токены лучших бизнес-проектов и получайте пассивный доход
          </Typography>
        </motion.div>
        
        {/* Статистика рынка */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 4 }}>
            <MarketSummary data={marketStats} />
          </Box>
        </motion.div>
        
        {/* Сетка с трендовыми токенами */}
        <motion.div variants={itemVariants}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Популярные токены
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {trendingTokens.map((token) => (
              <Grid item xs={12} sm={6} md={3} key={token.id}>
                <Paper 
                  sx={{ 
                    p: 2, 
                    height: '100%', 
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark' 
                      ? `linear-gradient(135deg, ${alpha('#1a2035', 0.9)}, ${alpha('#1a2035', 0.6)})`
                      : `linear-gradient(135deg, ${alpha('#fff', 0.95)}, ${alpha('#f8f9fa', 0.85)})`,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#000', 0.05)}`,
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 2
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={token.symbol}
                        size="small"
                        sx={{
                          fontWeight: 'bold',
                          mr: 1
                        }}
                      />
                      <Typography variant="body2" fontWeight="medium">
                        {token.name}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleToggleFavorite(token.id)}
                      sx={{ p: 0.5 }}
                    >
                      {favoriteTokens.includes(token.id) ? (
                        <StarIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ height: 120 }}>
                    <TrendingChart
                      title={token.name}
                      symbol={token.symbol}
                      currentValue={token.price}
                      changePercent={token.changePercent}
                      isPositive={token.isPositive}
                      height={120}
                    />
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        
        {/* Таблица токенов */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Все токены
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Обновить данные">
                <IconButton onClick={handleRefreshData}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              
              <SearchField
                size="small"
                placeholder="Поиск токенов..."
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
                sx={{ width: { xs: 150, sm: 220 } }}
              />
            </Box>
          </Box>
          
          <Paper 
            sx={{ 
              borderRadius: 2, 
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)' 
            }}
          >
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(10px)'
              }}
            >
              <Tab label="Все токены" />
              <Tab label={`Избранное (${favoriteTokens.length})`} />
              <Tab label="Верифицировано" />
              <Tab label="Растущие" />
              <Tab label="Падающие" />
            </Tabs>
            
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell align="center" sx={{ width: 50 }}>#</TableHeaderCell>
                    <TableHeaderCell>Токен</TableHeaderCell>
                    <TableHeaderCell 
                      align="right"
                      onClick={() => handleSort('price')}
                    >
                      Цена {getSortIcon('price')}
                    </TableHeaderCell>
                    <TableHeaderCell 
                      align="right"
                      onClick={() => handleSort('priceChange24h')}
                    >
                      24ч % {getSortIcon('priceChange24h')}
                    </TableHeaderCell>
                    <TableHeaderCell 
                      align="right"
                      onClick={() => handleSort('volume24h')}
                    >
                      Объем (24ч) {getSortIcon('volume24h')}
                    </TableHeaderCell>
                    <TableHeaderCell 
                      align="right"
                      onClick={() => handleSort('marketCap')}
                    >
                      Капитализация {getSortIcon('marketCap')}
                    </TableHeaderCell>
                    <TableHeaderCell align="center" sx={{ width: 60 }}>Избр.</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTokens.length > 0 ? (
                    filteredTokens.map((token, index) => (
                      <StyledTableRow key={token.id} onClick={() => handleTokenDetails(token.id)}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={token.logo} 
                              alt={token.name}
                              sx={{ width: 32, height: 32, mr: 1.5 }}
                            />
                            <Box>
                              <Typography variant="body2" fontWeight="bold" component="span">
                                {token.name}
                              </Typography>
                              {token.verified && (
                                <Tooltip title="Верифицированный токен">
                                  <VerifiedIcon 
                                    fontSize="small" 
                                    sx={{ ml: 0.5, color: theme.palette.primary.main, verticalAlign: 'middle', fontSize: '1rem' }} 
                                  />
                                </Tooltip>
                              )}
                              <Typography variant="caption" color="text.secondary" display="block">
                                {token.symbol}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" fontWeight="medium">
                            {formatPrice(token.price)}
                          </Typography>
                        </TableCell>
                        <TableCell 
                          align="right" 
                          sx={{ 
                            color: token.isPositive 
                              ? theme.palette.success.main 
                              : theme.palette.error.main,
                            fontWeight: 'medium'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {token.isPositive ? (
                              <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                            ) : (
                              <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
                            )}
                            {token.isPositive ? '+' : ''}{token.priceChange24h}%
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {formatVolume(token.volume24h)}
                        </TableCell>
                        <TableCell align="right">
                          {formatVolume(token.marketCap)}
                        </TableCell>
                        <TableCell align="center" onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(token.id);
                        }}>
                          <IconButton size="small">
                            {favoriteTokens.includes(token.id) ? (
                              <StarIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                            ) : (
                              <StarBorderIcon fontSize="small" />
                            )}
                          </IconButton>
                        </TableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <ErrorOutlineIcon sx={{ fontSize: 40, color: 'text.secondary', opacity: 0.6 }} />
                          <Typography variant="body1" color="text.secondary">
                            Токены не найдены
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Попробуйте изменить параметры поиска
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            {!account && (
              <Box sx={{ p: 2, textAlign: 'center', borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={connectWallet}
                  startIcon={<Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem', bgcolor: alpha(theme.palette.background.paper, 0.2) }}>♦</Avatar>}
                  sx={{ px: 3 }}
                >
                  Подключить кошелёк для инвестирования
                </Button>
              </Box>
            )}
          </Paper>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Exchange; 