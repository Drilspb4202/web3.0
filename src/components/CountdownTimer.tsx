import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface CountdownTimerProps {
  launchDate: Date;
  title?: string;
  subtitle?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  launchDate, 
  title = "Запуск Чиху коина", 
  subtitle = "Не упустите возможность приобрести токены на старте!" 
}) => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Функция для вычисления оставшегося времени
  const calculateTimeLeft = () => {
    const difference = launchDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  };
  
  // Обновляем время каждую секунду
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });
  
  // Форматирование даты запуска
  const formatLaunchDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Стили для блоков времени
  const timeBlockStyle = {
    background: theme.palette.mode === 'dark' 
      ? `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.6)}, ${alpha(theme.palette.primary.main, 0.2)})`
      : `linear-gradient(145deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.light, 0.3)})`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: 2,
    p: 2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    minHeight: 120,
    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.1)}`
  };
  
  // Анимация для блоков
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };
  
  // Анимация для секунд
  const secondsVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1], transition: { duration: 1, repeat: Infinity } }
  };
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Декоративные элементы */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: -100, 
          right: -100, 
          width: 200, 
          height: 200, 
          borderRadius: '50%', 
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
          filter: 'blur(40px)',
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: -80, 
          left: -80, 
          width: 180, 
          height: 180, 
          borderRadius: '50%', 
          background: `linear-gradient(225deg, ${alpha(theme.palette.secondary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.2)})`,
          filter: 'blur(35px)',
          zIndex: 0
        }} 
      />
      
      {/* Заголовок и подзаголовок */}
      <Box sx={{ position: 'relative', zIndex: 1, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
        
        {/* Дата запуска */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mt: 2,
            gap: 1,
            color: theme.palette.primary.main
          }}
        >
          <CalendarMonthIcon />
          <Typography variant="body1" fontWeight="medium">
            {formatLaunchDate(launchDate)}
          </Typography>
        </Box>
      </Box>
      
      {/* Таймер обратного отсчета */}
      <Grid 
        container 
        spacing={3}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid item xs={6} md={3} component={motion.div} variants={itemVariants}>
          <Box sx={timeBlockStyle}>
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold"
              sx={{ 
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              {String(timeLeft.days).padStart(2, '0')}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              {timeLeft.days === 1 ? 'День' : 'Дней'}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} md={3} component={motion.div} variants={itemVariants}>
          <Box sx={timeBlockStyle}>
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold"
              sx={{ 
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              {String(timeLeft.hours).padStart(2, '0')}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              {timeLeft.hours === 1 ? 'Час' : (timeLeft.hours >= 2 && timeLeft.hours <= 4) ? 'Часа' : 'Часов'}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} md={3} component={motion.div} variants={itemVariants}>
          <Box sx={timeBlockStyle}>
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold"
              sx={{ 
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              {String(timeLeft.minutes).padStart(2, '0')}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              Минут
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={6} md={3} component={motion.div} variants={itemVariants}>
          <Box 
            component={motion.div}
            variants={secondsVariants}
            initial="initial"
            animate="animate"
            sx={timeBlockStyle}
          >
            <Typography 
              variant="h3" 
              component="div" 
              fontWeight="bold"
              sx={{ 
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              {String(timeLeft.seconds).padStart(2, '0')}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight="medium">
              Секунд
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      {/* Иконка часов */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          position: 'relative',
          zIndex: 1
        }}
      >
        <AccessTimeIcon 
          sx={{ 
            fontSize: 40, 
            opacity: 0.6,
            color: theme.palette.primary.main
          }} 
        />
      </Box>
    </Paper>
  );
};

export default CountdownTimer; 