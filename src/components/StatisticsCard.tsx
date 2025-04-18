import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  alpha 
} from '@mui/material';
import { motion } from 'framer-motion';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface StatisticsCardProps {
  label: string;
  value: string;
  icon: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ label, value, icon }) => {
  const theme = useTheme();
  
  const getIcon = () => {
    switch (icon) {
      case 'people':
        return <PeopleIcon fontSize="large" />;
      case 'business':
        return <BusinessIcon fontSize="large" />;
      case 'money':
        return <MonetizationOnIcon fontSize="large" />;
      case 'trending_up':
        return <TrendingUpIcon fontSize="large" />;
      default:
        return <BusinessIcon fontSize="large" />;
    }
  };
  
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        border: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        }
      }}
      component={motion.div}
      whileHover={{ y: -5 }}
    >
      <Box
        sx={{
          mr: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
        }}
      >
        {getIcon()}
      </Box>
      
      <Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            mb: 0.5
          }}
        >
          {value}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontWeight: 'medium' }}
        >
          {label}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatisticsCard; 