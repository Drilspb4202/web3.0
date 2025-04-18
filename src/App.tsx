import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Chip, 
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  Paper
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Иконки
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TokenIcon from '@mui/icons-material/Token';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';

// Компоненты
import Home from './pages/Home';
import CreateToken from './pages/CreateToken';
import TokenList from './pages/TokenList';
import Dashboard from './pages/Dashboard';
import TokenDetails from './pages/TokenDetails';
import Investors from './pages/Investors';
import Profile from './pages/Profile';

// Web3 контекст
import { Web3Context, Web3Provider } from './contexts/Web3Context';

// Главный компонент приложения с маршрутизацией
function App() {
  return (
    <Web3Provider>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppContent />
    </Web3Provider>
  );
}

// Содержимое приложения, использующее контекст
function AppContent() {
  const { account, isLocalNode, isLoading, connectWallet, networkName } = useContext(Web3Context);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getNetworkColor = () => {
    if (networkName?.includes('Локальная')) return '#2ECC71';
    if (networkName?.includes('Fuji')) return '#3498DB';
    if (networkName?.includes('Mainnet')) return '#E74C3C';
    return '#F39C12';
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [
    { title: 'Главная', path: '/', icon: <HomeIcon /> },
    { title: 'Проекты', path: '/tokens', icon: <BusinessIcon /> },
    { title: 'Инвесторы', path: '/investors', icon: <PeopleIcon /> },
    { title: 'Мой профиль', path: '/profile', icon: <PersonIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Avatar 
          src="/logo192.png" 
          alt="Chihuahua Capital" 
          sx={{ width: 80, height: 80 }} 
        />
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem 
            button 
            component={Link} 
            to={link.path} 
            key={link.title}
            onClick={toggleDrawer}
            sx={{ 
              '&:hover': { 
                bgcolor: 'rgba(142, 68, 173, 0.1)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'var(--primary-color)' }}>
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        {isLoading ? (
          <Button 
            variant="contained" 
            fullWidth
            disabled
            startIcon={<CircularProgress size={20} color="inherit" />}
          >
            Загрузка...
          </Button>
        ) : !account ? (
          <Button 
            variant="contained" 
            fullWidth
            onClick={connectWallet}
            className="btn-gradient"
            sx={{ 
              background: 'var(--gradient-primary)',
              textTransform: 'none',
              py: 1
            }}
            startIcon={<AccountBalanceWalletIcon />}
          >
            Подключить кошелёк (MetaMask/Fuji)
          </Button>
        ) : (
          <Paper elevation={2} sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(142, 68, 173, 0.1)' }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Подключено:
            </Typography>
            <Chip 
              label={`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
              color="primary"
              sx={{ width: '100%', fontWeight: 'bold' }}
            />
          </Paper>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'var(--gradient-primary)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <Toolbar>
          {isMobile ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Avatar 
              src="/logo192.png" 
              alt="Chihuahua Logo" 
              sx={{ width: 32, height: 32, mr: 1, display: { xs: 'none', sm: 'flex' } }} 
            />
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Chihuahua Capital
            </Link>
          </Typography>
          
          {networkName && (
            <Chip 
              label={networkName}
              sx={{ 
                backgroundColor: getNetworkColor(),
                color: 'white',
                fontWeight: 'bold',
                mr: 2,
                boxShadow: 'var(--shadow-sm)'
              }}
              size="small"
            />
          )}
          
          {!isMobile && (
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 1,
                '& .MuiButton-root': {
                  fontWeight: 500,
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-md)'
                  }
                }
              }}
            >
              {navLinks.map((link) => (
                <Button 
                  key={link.title}
                  color="inherit" 
                  component={Link} 
                  to={link.path}
                  startIcon={link.icon}
                >
                  {link.title}
                </Button>
              ))}
              
              {isLoading ? (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  disabled
                  sx={{ minWidth: 160 }}
                >
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Загрузка...
                </Button>
              ) : !account ? (
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'var(--primary-color)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)'
                    },
                    minWidth: 230
                  }}
                  onClick={connectWallet}
                  startIcon={<AccountBalanceWalletIcon />}
                >
                  Подключить кошелёк (MetaMask/Fuji)
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'var(--primary-dark)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)'
                    }
                  }}
                >
                  {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        {drawerContent}
      </Drawer>
      
      <Container 
        component="main" 
        sx={{ 
          mt: 4, 
          mb: 6, 
          flex: '1 0 auto',
          animation: 'fadeIn var(--transition-normal)'
        }}
        maxWidth="lg"
      >
        {isLoading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '60vh',
              flexDirection: 'column'
            }}
          >
            <CircularProgress size={60} sx={{ color: 'var(--primary-color)' }} />
            <Typography variant="h6" sx={{ mt: 2, color: 'var(--primary-color)' }}>
              Загрузка приложения...
            </Typography>
          </Box>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-token" element={<CreateToken />} />
            <Route path="/tokens" element={<TokenList />} />
            <Route path="/tokens/:id" element={<TokenDetails />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          bgcolor: '#F8F9FA', 
          borderTop: '1px solid #eaeaea',
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
              <Typography variant="body2" color="text.secondary">
                © 2023 Chihuahua Capital. Все права защищены.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Запущено на тестовой сети Avalanche Fuji
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton size="small" sx={{ color: '#333' }}>
                <GitHubIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#1DA1F2' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#0088cc' }}>
                <TelegramIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App; 