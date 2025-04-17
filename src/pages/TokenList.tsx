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
  styled
} from '@mui/material';
import { Web3Context } from '../contexts/Web3Context';
import { getTokensCount, getTokensInfo, TokenInfo } from '../services/tokenFactory';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { FiltersBar } from '../components/FiltersBar';
import TokenCard from '../components/TokenCard';

// Иконки
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TokenIcon from '@mui/icons-material/Token';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
          Explore Tokens
        </Typography>
        <Typography 
          variant="body1" 
          color="textSecondary" 
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Discover all tokens created on the Chihuahua Capital platform
        </Typography>
      </PageHeading>

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
              <AnimatePresence>
                {currentTokens.map((token, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={token.tokenAddress}>
                    <TokenCard 
                      token={token} 
                      onViewDetails={() => navigate(`/tokens/${token.tokenAddress}`)}
                      index={index}
                    />
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </motion.div>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Stack spacing={2}>
                  <StyledPagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size={isMobile ? "small" : "medium"}
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              </motion.div>
            </Box>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default TokenList; 