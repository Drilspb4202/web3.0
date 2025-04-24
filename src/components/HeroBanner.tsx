import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  useTheme, 
  alpha, 
  Chip,
  Stack,
  useMediaQuery
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TokenIcon from '@mui/icons-material/Token';

// Компонент анимированных частиц для фона
const Particles = () => {
  // Генерируем случайные частицы
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.6
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(106, 17, 203, 0.4), rgba(37, 117, 252, 0.4))',
            filter: 'blur(1px)'
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </Box>
  );
};

// Компонент подсвеченного текста
const HighlightedText = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="span"
    sx={{
      position: 'relative',
      color: 'white',
      fontWeight: 'bold',
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '0px',
        left: '0px',
        right: '0px',
        height: '40%',
        background: 'linear-gradient(90deg, rgba(106, 17, 203, 0.4), rgba(37, 117, 252, 0.4))',
        zIndex: -1,
        borderRadius: '4px'
      }
    }}
  >
    {children}
  </Box>
);

// Анимированная 3D-карточка токена
const TokenCard = () => {
  const theme = useTheme();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <Box
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        perspective: '1000px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div
        animate={{ 
          rotateX: rotateX, 
          rotateY: rotateY,
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
        }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 20,
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2b2473 0%, #3d0b56 100%)',
            p: 4,
            position: 'relative',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transformStyle: 'preserve-3d',
            height: 400,
          }}
        >
          {/* Holographic Overlay */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
              opacity: 0.5,
              zIndex: 2 
            }} 
          />
          
          {/* Glowing Circle Behind Token */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(138, 43, 226, 0.6) 0%, rgba(138, 43, 226, 0) 70%)',
              filter: 'blur(20px)',
              zIndex: 1
            }}
          />
          
          {/* Token Icon */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translateZ(30px)',
              zIndex: 3,
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(5px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Typography 
              variant="h3" 
              component="div" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'white',
                textShadow: '0 2px 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              CHIH
            </Typography>
          </Box>
          
          {/* Coin name */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              position: 'absolute',
              bottom: 40,
              left: 0,
              right: 0,
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              transform: 'translateZ(20px)',
              zIndex: 3
            }}
          >
            Chihuahua Capital
          </Typography>
          
          {/* Card details */}
          <Typography
            variant="body2"
            component="div"
            sx={{
              position: 'absolute',
              top: 30,
              left: 30,
              color: 'white',
              opacity: 0.8,
              transform: 'translateZ(15px)',
              zIndex: 3
            }}
          >
            ERC-20 Token
          </Typography>
          
          <Typography
            variant="body2"
            component="div"
            sx={{
              position: 'absolute',
              top: 30,
              right: 30,
              color: 'white',
              opacity: 0.8,
              transform: 'translateZ(15px)',
              zIndex: 3
            }}
          >
            1,250₽
          </Typography>
          
          {/* Small particles inside card */}
          {Array.from({ length: 15 }).map((_, i) => {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            return (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  top: `${y}%`,
                  left: `${x}%`,
                  transform: 'translateZ(5px)',
                  zIndex: 2
                }}
              />
            );
          })}
        </Box>
      </motion.div>
    </Box>
  );
};

interface HeroBannerProps {
  onNavigateToCountdown?: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigateToCountdown }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const controls = useAnimation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  useEffect(() => {
    controls.start({
      y: [20, 0],
      opacity: [0, 1],
      transition: { duration: 0.8, staggerChildren: 0.2 }
    });
  }, [controls]);
  
  // Состояние для эффекта наведения на кнопку
  const [hoverJoin, setHoverJoin] = useState(false);
  const [hoverLearn, setHoverLearn] = useState(false);

  // Анимация для заголовков
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Анимация для описания
  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Анимация для кнопок
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Анимация для числовых данных
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 1.2 + i * 0.2,
        ease: "easeOut"
      }
    })
  };

  // Данные о прогрессе проекта
  const stats = [
    { value: "$2.7M", label: "СОБРАНО" },
    { value: "11,500+", label: "ИНВЕСТОРОВ" },
    { value: "83%", label: "К ЦЕЛИ" }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 18 },
        pb: { xs: 12, md: 18 },
        bgcolor: 'background.default',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Фон с частицами */}
      <Particles />

      {/* Основной контент */}
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Сверхзаголовок */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="subtitle1"
              component="p"
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 2,
                letterSpacing: '3px',
                textTransform: 'uppercase'
              }}
            >
              Революция в мире крипто-инвестиций
            </Typography>
          </motion.div>

          {/* Главный заголовок */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                mb: 3,
                maxWidth: '900px'
              }}
            >
              <HighlightedText>Chihuahua Capital</HighlightedText> - Первый инвестиционный фонд, где правят маленькие, но смелые
            </Typography>
          </motion.div>

          {/* Описание */}
          <motion.div
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: 'text.secondary',
                mb: 6,
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Мы объединяем современные технологии блокчейна с проверенными стратегиями инвестирования,
              чтобы даже небольшие вложения могли принести существенный доход. Маленькие инвестиции, большие результаты!
            </Typography>
          </motion.div>

          {/* Кнопки действия */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              sx={{ mb: 8 }}
            >
              <Button
                variant="contained"
                size="large"
                onMouseEnter={() => setHoverJoin(true)}
                onMouseLeave={() => setHoverJoin(false)}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                  boxShadow: '0 10px 20px rgba(37, 117, 252, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                    boxShadow: '0 15px 25px rgba(37, 117, 252, 0.4)',
                  }
                }}
              >
                <motion.div
                  animate={hoverJoin ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ИНВЕСТИРОВАТЬ СЕЙЧАС
                </motion.div>
              </Button>

              <Button
                variant="outlined"
                size="large"
                onMouseEnter={() => setHoverLearn(true)}
                onMouseLeave={() => setHoverLearn(false)}
                endIcon={
                  <motion.div
                    animate={hoverLearn ? { x: 5 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowForwardIcon />
                  </motion.div>
                }
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: '50px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                УЗНАТЬ БОЛЬШЕ
              </Button>
            </Stack>
          </motion.div>

          {/* Статистика */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: { xs: 3, sm: 5, md: 8 },
              width: '100%'
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={statsVariants}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h3"
                    component="p"
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.5
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 'medium',
                      letterSpacing: '1px'
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Декоративный градиентный элемент внизу */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
          zIndex: 1
        }}
      />
    </Box>
  );
};

export default HeroBanner; 