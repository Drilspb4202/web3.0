import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  Chip, 
  CircularProgress, 
  Avatar, 
  IconButton,
  useTheme,
  alpha,
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import TokenIcon from '@mui/icons-material/Token';
import InfoIcon from '@mui/icons-material/Info';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { shortenAddress, formatDate, formatAmount } from '../utils';
import { Web3Context } from '../contexts/Web3Context';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import DashboardCard from '../components/DashboardCard';
import { 
  addUserToken, 
  isTokenFavorite, 
  toggleFavoriteToken,
  getUserTokens
} from '../services/userTokens';

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  totalSupply: string;
  owner: string;
  createdAt: string;
  description: string;
  address: string;
  imageUrl?: string;
}

const TokenDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { account } = useContext(Web3Context);
  
  const [token, setToken] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInUserPortfolio, setIsInUserPortfolio] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Fetch token details
  useEffect(() => {
    const fetchTokenDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // This is just mock data for display
        // In a real app, you would fetch this from your contract or API
        setTimeout(() => {
          const mockToken = {
            id: id || '1',
            name: 'Urban Coffee Shop',
            symbol: 'UCOF',
            totalSupply: '1000000',
            owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            createdAt: new Date().toISOString(),
            description: 'Urban Coffee Shop is a premium coffee chain with 5 locations in downtown. This token represents ownership shares in the business.',
            address: id || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
            imageUrl: 'https://example.com/urban-coffee-shop.jpg'
          };
          
          setToken(mockToken);
          
          // Check if token is in user's portfolio
          if (account) {
            const userBinding = getUserTokens(account);
            if (userBinding) {
              setIsInUserPortfolio(userBinding.tokenAddresses.includes(mockToken.address));
              setIsFavorite(userBinding.favoriteTokens.includes(mockToken.address));
            }
          }
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Failed to fetch token details:', err);
        setError('Failed to load token details. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchTokenDetails();
  }, [id, account]);
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message, { autoClose: 2000 });
  };
  
  const handleAddToPortfolio = () => {
    if (!account || !token) return;
    
    addUserToken(account, token.address);
    setIsInUserPortfolio(true);
    toast.success(`${token.name} (${token.symbol}) added to your portfolio`, { autoClose: 3000 });
  };
  
  const handleToggleFavorite = () => {
    if (!account || !token) return;
    
    const newStatus = toggleFavoriteToken(account, token.address);
    setIsFavorite(newStatus);
    
    if (newStatus) {
      toast.success(`${token.name} added to favorites`, { autoClose: 2000 });
    } else {
      toast.info(`${token.name} removed from favorites`, { autoClose: 2000 });
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
        </Box>
      </Container>
    );
  }
  
  if (error || !token) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            {error || 'Token not found'}
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/tokens')}
            sx={{ mt: 2 }}
          >
            Back to Token List
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button 
        variant="text" 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/tokens')}
        sx={{ mb: 3 }}
      >
        Back to Token List
      </Button>
      
      {/* Token Header */}
      <Fade in={true} timeout={800}>
        <Paper 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3,
            background: theme.palette.mode === 'dark' 
              ? `linear-gradient(135deg, ${alpha('#1a2035', 0.9)}, ${alpha('#1a2035', 0.6)})`
              : `linear-gradient(135deg, ${alpha('#fff', 0.95)}, ${alpha('#f0f0f0', 0.85)})`,
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#fff', 0.7)}`,
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: '-50%', 
            right: '-10%', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.3)}, transparent 70%)`,
            zIndex: 0,
          }} />
        
          <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    mr: 2, 
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.5rem'
                  }}
                  src={token.imageUrl}
                >
                  {!token.imageUrl && token.symbol.substring(0, 2)}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {token.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      label={token.symbol} 
                      size="small" 
                      sx={{ 
                        mr: 1,
                        fontWeight: 'bold',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }} 
                    />
                    <Tooltip title="Copy Token Address">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {shortenAddress(token.address)}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => copyToClipboard(token.address, 'Token address copied!')}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {token.description}
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} /> Created
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {formatDate(token.createdAt)}
                  </Typography>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <TokenIcon fontSize="small" sx={{ mr: 0.5 }} /> Supply
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {Number(token.totalSupply).toLocaleString()}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <PersonIcon fontSize="small" sx={{ mr: 0.5 }} /> Creator
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {shortenAddress(token.owner)}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => copyToClipboard(token.owner, 'Creator address copied!')}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
              
              {/* Add Portfolio and Favorite buttons */}
              {account && (
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  {!isInUserPortfolio ? (
                    <Button 
                      variant="outlined" 
                      color="primary"
                      startIcon={<AddIcon />}
                      onClick={handleAddToPortfolio}
                      sx={{ borderRadius: 2 }}
                    >
                      Add to Portfolio
                    </Button>
                  ) : (
                    <Button 
                      variant="outlined" 
                      color="success"
                      disabled
                      sx={{ borderRadius: 2 }}
                    >
                      In Your Portfolio
                    </Button>
                  )}
                  
                  <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    <IconButton 
                      color={isFavorite ? "warning" : "default"}
                      onClick={handleToggleFavorite}
                      sx={{ 
                        border: `1px solid ${isFavorite ? theme.palette.warning.main : theme.palette.divider}`,
                        borderRadius: 2,
                        color: isFavorite ? theme.palette.warning.main : undefined
                      }}
                    >
                      {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ 
                position: 'relative',
                mb: 4,
                mx: 'auto',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,178,0,0.4) 0%, rgba(255,178,0,0) 70%)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                  animation: 'glow 4s infinite',
                  '@keyframes glow': {
                    '0%': { opacity: 0.5 },
                    '50%': { opacity: 1 },
                    '100%': { opacity: 0.5 },
                  }
                }
              }}>
                <Box
                  component="img"
                  src="/images/chihuahua-coin.jpeg"
                  alt="Chihuahua Coin Logo"
                  sx={{
                    width: '100%',
                    maxWidth: 280,
                    height: 'auto',
                    mx: 'auto',
                    display: 'block',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                    transition: 'all 0.3s ease',
                    borderRadius: '8px',
                    transform: 'scale(1.05)',
                    animation: 'pulse 3s infinite',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                      },
                      '50%': {
                        transform: 'scale(1.08)',
                      },
                      '100%': {
                        transform: 'scale(1)',
                      },
                    },
                    '&:hover': {
                      transform: 'scale(1.1)',
                      filter: 'drop-shadow(0 6px 12px rgba(255,178,0,0.5))',
                    }
                  }}
                />
              </Box>
              
              <Typography 
                variant="h4" 
                align="center" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3,
                  background: 'linear-gradient(to right, #FF9900, #FFCC00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))',
                  letterSpacing: '1px',
                  fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif'
                }}
              >
                CHIHUAHUA COIN
              </Typography>
              
              <Box 
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                sx={{ 
                  p: 3,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.7)})`,
                  color: '#fff',
                  textAlign: 'center',
                  boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                  mb: 2
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
                  Current Price
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  $23.45
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    +12.5% (24h)
                  </Typography>
                </Box>
              </Box>
              
              <Button 
                variant="contained" 
                size="large"
                fullWidth
                sx={{ 
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)'
                    : 'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)'
                  }
                }}
              >
                Buy Tokens
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
      
      {/* Token Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="Market Cap"
                value="$23,450,000"
                valueLabel="Current valuation"
                trend={8.5}
                trendLabel="past month"
                icon={<TokenIcon sx={{ color: '#fff' }} />}
                iconBgColor="#6c5ce7"
              />
            </Box>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '200ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="24h Volume"
                value="$567,890"
                valueLabel="Trading activity"
                trend={12.3}
                trendLabel="vs yesterday"
                icon={<TrendingUpIcon sx={{ color: '#fff' }} />}
                iconBgColor="#00b894"
              />
            </Box>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="Holders"
                value="152"
                valueLabel="Unique wallets"
                trend={5.2}
                trendLabel="past week"
                icon={<AccountBalanceWalletIcon sx={{ color: '#fff' }} />}
                iconBgColor="#e84393"
              />
            </Box>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '400ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="Dividend Yield"
                value="5.2%"
                valueLabel="Annual return"
                trend={0.8}
                trendLabel="vs last quarter"
                icon={<InfoIcon sx={{ color: '#fff' }} />}
                iconBgColor="#ff7675"
              />
            </Box>
          </Zoom>
        </Grid>
      </Grid>
      
      {/* Price Chart Placeholder */}
      <Paper sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 3,
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(145deg, rgba(26, 32, 53, 0.9), rgba(28, 34, 55, 0.7))' 
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.7))',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'}`,
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Price History
        </Typography>
        
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Chart will be available soon
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TokenDetails; 