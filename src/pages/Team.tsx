import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useTheme, 
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import TeamGrid from '../components/TeamGrid';

const Team = () => {
  const theme = useTheme();

  return (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1,
        pb: 8
      }}
    >
      {/* Hero Section */}
      <Box 
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 10, md: 15 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`
        }}
      >
        {/* Декоративные элементы */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            top: '-100px',
            right: '-100px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            filter: 'blur(50px)'
          }}
        />
        
        <Box 
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          sx={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            bottom: '-50px',
            left: '-50px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            filter: 'blur(50px)'
          }}
        />

        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="overline" 
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                letterSpacing: 2,
                mb: 2
              }}
            >
              КОМАНДА ЭКСПЕРТОВ
            </Typography>
            
            <Typography 
              variant="h2" 
              component={motion.h1}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                fontWeight: 'bold',
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Строим будущее DeFi вместе
            </Typography>
            
            <Typography 
              variant="h6" 
              color="text.secondary"
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{ mb: 4 }}
            >
              Наша команда объединяет ведущих специалистов в области блокчейна, финансов и технологий,
              чтобы сделать децентрализованные финансы доступными для всех
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Team Grid Section */}
      <TeamGrid />
    </Box>
  );
};

export default Team; 