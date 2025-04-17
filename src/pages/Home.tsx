import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Paper, 
  Alert,
  Container,
  CardMedia,
  Chip,
  Avatar,
  Stack,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Web3Context } from '../contexts/Web3Context';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DevicesIcon from '@mui/icons-material/Devices';
import SecurityIcon from '@mui/icons-material/Security';
import NetworkStats from '../components/NetworkStats';
import ThemeToggle from '../components/ThemeToggle';

const Home: React.FC = () => {
  const { account, isLocalNode, networkName, darkMode } = useContext(Web3Context);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: 'Создавайте токены',
      description: 'Выпускайте собственные ERC20 токены для вашего бизнеса или проекта. Полностью настраиваемые имя, символ и общее предложение.',
      icon: <AddCircleOutlineIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />,
      image: 'https://images.unsplash.com/photo-1621501103258-d0873451c868?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Отслеживайте токены',
      description: 'Просматривайте список всех выпущенных токенов. Получайте подробную информацию о каждом токене в нашей экосистеме.',
      icon: <VisibilityIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />,
      image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    },
    {
      title: 'Без лишних затрат',
      description: isLocalNode 
        ? 'Используйте локальную ноду для разработки и тестирования без затрат на газ.'
        : 'Минимальные комиссии за газ благодаря использованию тестовой сети Avalanche Fuji. Создавайте и экспериментируйте бесплатно.',
      icon: <LocalAtmIcon fontSize="large" sx={{ color: 'var(--primary-color)' }} />,
      image: 'https://images.unsplash.com/photo-1642784353782-031b41e84fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
    }
  ];

  const benefits = [
    {
      title: 'Инновации',
      description: 'Используйте технологии блокчейн для создания новых возможностей для вашего бизнеса.',
      icon: <LightbulbIcon />
    },
    {
      title: 'Кросс-платформенность',
      description: 'Токены работают на всех устройствах и платформах, поддерживающих Avalanche.',
      icon: <DevicesIcon />
    },
    {
      title: 'Безопасность',
      description: 'Ваши токены защищены криптографией и распределенным хранением данных.',
      icon: <SecurityIcon />
    }
  ];

  return (
    <Container className="fade-in" maxWidth="lg">
      {/* Hero Section */}
      <Box 
        sx={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          mb: 8,
          height: { xs: '400px', md: '500px' },
          background: 'var(--gradient-hero)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 4
        }}
      >
        <Box 
          sx={{
            zIndex: 2,
            color: 'white',
            maxWidth: 700
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Chihuahua Capital
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              fontWeight: 400,
              opacity: 0.9
            }}
          >
            Токенизируйте свой бизнес на блокчейне Avalanche
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            justifyContent="center"
          >
            {account ? (
              <>
                <Button
                  component={Link}
                  to="/create-token"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'var(--primary-color)',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-3px)',
                      boxShadow: 'var(--shadow-lg)',
                    },
                    textTransform: 'none'
                  }}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Создать токен
                </Button>
                
                <Button
                  component={Link}
                  to="/tokens"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 'var(--radius-md)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-3px)',
                    },
                    textTransform: 'none'
                  }}
                  startIcon={<VisibilityIcon />}
                >
                  Посмотреть токены
                </Button>
              </>
            ) : (
              <Typography variant="h6" color="white" sx={{ fontWeight: 400 }}>
                Подключите кошелек для создания токенов
              </Typography>
            )}
          </Stack>
          
          {/* Индикатор сети */}
          {networkName && (
            <Chip
              label={networkName}
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                fontWeight: 'bold',
                bgcolor: isLocalNode ? 'var(--success-color)' : 'var(--info-color)',
                color: 'white',
                boxShadow: 'var(--shadow-sm)'
              }}
              size="small"
            />
          )}
          
          {/* Переключатель темы */}
          <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
            <ThemeToggle />
          </Box>
        </Box>
      </Box>
      
      {/* Сетевая статистика */}
      {account && (
        <Box sx={{ mb: 5 }}>
          <NetworkStats />
        </Box>
      )}
      
      {/* Информация о локальной ноде */}
      {isLocalNode && networkName?.includes('Локальная') && (
        <Alert 
          severity="info" 
          variant="filled"
          sx={{ 
            mb: 6, 
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}
          icon={<DevicesIcon fontSize="inherit" />}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Режим локальной разработки активен!
          </Typography>
          <Typography variant="body2">
            Вы используете локальную Hardhat ноду для тестирования. Все транзакции и созданные токены существуют только локально и будут сброшены при перезапуске ноды.
          </Typography>
        </Alert>
      )}
      
      {/* Основные возможности */}
      <Typography 
        variant="h4" 
        component="h2" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: 600,
          color: 'var(--dark-color)'
        }}
      >
        Ключевые возможности
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card 
              className="card-hover" 
              sx={{ 
                height: '100%', 
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-normal)'
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={feature.image}
                alt={feature.title}
                sx={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  {feature.icon}
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ ml: 1, fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Дополнительные преимущества */}
      <Box 
        sx={{ 
          bgcolor: '#f8f9fa', 
          py: 6, 
          px: { xs: 2, md: 6 },
          borderRadius: 'var(--radius-lg)',
          mb: 6,
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            fontWeight: 600,
            color: 'var(--dark-color)'
          }}
        >
          Преимущества Chihuahua Capital
        </Typography>
        
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  borderRadius: 'var(--radius-md)',
                  bgcolor: 'white',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)',
                  '&:hover': {
                    boxShadow: 'var(--shadow-md)',
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mb: 2 
                  }}
                >
                  <Avatar 
                    sx={{ 
                      bgcolor: 'var(--primary-light)', 
                      width: 60, 
                      height: 60,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  align="center" 
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {benefit.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center"
                >
                  {benefit.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Инструкции по использованию */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          borderRadius: 'var(--radius-lg)',
          bgcolor: 'white',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '5px', 
            height: '100%', 
            bgcolor: 'var(--primary-color)' 
          }} 
        />
        
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            color: 'var(--dark-color)',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <LightbulbIcon sx={{ mr: 1, color: 'var(--primary-color)' }} />
          Как использовать
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box component="ol" sx={{ pl: 2, my: 2 }}>
          {isLocalNode ? (
            <>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Убедитесь, что Hardhat нода запущена командой <code>npx hardhat node</code>
              </Typography>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Нажмите кнопку "Использовать локальную ноду" в верхнем меню
              </Typography>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Перейдите на страницу "Создать токен" и выпустите свой первый токен
              </Typography>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Просматривайте созданные токены в разделе "Токены"
              </Typography>
            </>
          ) : (
            <>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Подключите Metamask кошелек
              </Typography>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Переключитесь на тестовую сеть Avalanche Fuji
              </Typography>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Получите тестовые AVAX на <a href="https://faucet.avax.network/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>фаусете</a>
              </Typography>
              <Typography component="li" variant="body1" paragraph sx={{ mb: 1 }}>
                Создайте свой первый токен
              </Typography>
              <Typography component="li" variant="body1" paragraph>
                Просматривайте созданные токены в разделе "Токены"
              </Typography>
            </>
          )}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            component={Link}
            to="/create-token"
            variant="contained"
            className="btn-gradient"
            sx={{ 
              background: 'var(--gradient-primary)',
              color: 'white',
              fontWeight: 500,
              px: 4,
              borderRadius: 'var(--radius-md)',
              textTransform: 'none'
            }}
          >
            Начать сейчас
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home; 