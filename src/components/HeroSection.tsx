import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  useTheme, 
  useMediaQuery,
  Card,
  CardMedia
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TokenIcon from '@mui/icons-material/Token';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 80,
        damping: 15,
        delay: 0.4
      }
    }
  };
  
  const statsItems = [
    { 
      icon: <TokenIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      value: '500+',
      label: 'Успешных проектов'
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      value: '250 млн ₽',
      label: 'Привлечено инвестиций'
    }
  ];
  
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #3f51b5 100%)',
        color: 'white',
        pt: { xs: 10, md: 15 },
        pb: { xs: 12, md: 18 },
        overflow: 'hidden'
      }}
    >
      {/* Декоративные элементы */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.1,
          background: 'url(/images/pattern-grid.svg) repeat',
        }}
      />
      
      {/* Анимированные круги */}
      <Box
        component={motion.div}
        animate={{
          x: [0, 5, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.light,
          filter: 'blur(80px)',
          opacity: 0.4,
          top: -50,
          right: -100,
          zIndex: 0,
        }}
      />
      
      <Box
        component={motion.div}
        animate={{
          x: [0, -10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        sx={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '50%',
          backgroundColor: theme.palette.secondary.main,
          filter: 'blur(80px)',
          opacity: 0.3,
          bottom: -50,
          left: -100,
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                    background: 'linear-gradient(45deg, #ffffff 30%, #e0e0e0 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Инвестируй в будущее с Chihuahua Capital
                </Typography>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'normal',
                    mb: 4,
                    opacity: 0.9,
                    lineHeight: 1.5,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                  }}
                >
                  Первая платформа для токенизации проектов в России. 
                  Инвестируйте в бизнесы, которые вам нравятся, и получайте токены 
                  с реальной ценностью.
                </Typography>
              </motion.div>
              
              <Box
                component={motion.div}
                variants={itemVariants}
                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 6 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/projects')}
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                    },
                  }}
                >
                  Найти проекты
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Узнать больше
                </Button>
              </Box>
              
              <Box 
                component={motion.div} 
                variants={containerVariants}
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 4,
                  alignItems: 'center' 
                }}
              >
                {statsItems.map((item, index) => (
                  <Box 
                    key={index} 
                    component={motion.div}
                    variants={itemVariants}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2 
                    }}
                  >
                    <Box sx={{ opacity: 0.8 }}>{item.icon}</Box>
                    <Box>
                      <Typography 
                        variant="h4" 
                        component="div" 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: { xs: '1.75rem', sm: '2rem' }
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          opacity: 0.7,
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Box
              component={motion.div}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              sx={{
                position: 'relative',
                display: { xs: 'none', md: 'block' }
              }}
            >
              <Card
                elevation={10}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  transform: 'rotate(5deg)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'rotate(2deg) scale(1.02)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image="/images/chihuahua-coin.jpeg"
                  alt="Chihuahua Coin"
                  sx={{
                    height: 400,
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Card>
              
              {/* Floating elements */}
              <Box
                component={motion.div}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  zIndex: 5,
                }}
              >
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  ЧихуКоин
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Волнистый нижний край */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: 100 }}
        >
          <path
            d="M0,0 C240,80 480,100 720,70 C960,40 1200,80 1440,100 L1440,100 L0,100 Z"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default HeroSection; 