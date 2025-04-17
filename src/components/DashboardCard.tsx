import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme,
  alpha,
  Skeleton,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface DashboardCardProps {
  title: string;
  value: string | number;
  valueLabel?: string;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  value, 
  valueLabel,
  trend,
  trendLabel,
  icon,
  iconBgColor = '#6c5ce7'
}) => {
  const theme = useTheme();
  const isLoading = value === '—';
  const trendIsPositive = trend && trend > 0;

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
        transform: 'translateY(-5px)'
      }}
      sx={{
        borderRadius: 3,
        padding: '1.5rem',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(145deg, ${alpha('#1a2035', 0.8)}, ${alpha('#1a2035', 0.5)})`
          : `linear-gradient(145deg, ${alpha('#fff', 0.95)}, ${alpha('#fafafa', 0.85)})`,
        border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#fff', 0.7)}`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '150%',
          height: '150%',
          background: `radial-gradient(circle, ${alpha(iconBgColor, 0.1)} 0%, transparent 60%)`,
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 600,
              fontSize: '0.95rem',
              color: theme.palette.text.secondary
            }}
          >
            {title}
          </Typography>
          
          {icon && (
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  backgroundColor: iconBgColor,
                  boxShadow: `0 4px 12px ${alpha(iconBgColor, 0.4)}`,
                }}
              >
                {icon}
              </Box>
            </motion.div>
          )}
        </Box>

        <Box sx={{ mb: 1 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography color="text.secondary" variant="body2">Loading data...</Typography>
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Typography 
                variant="h4" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  lineHeight: 1.2,
                  background: `linear-gradient(90deg, ${iconBgColor} 0%, ${alpha(iconBgColor, 0.7)} 100%)`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                }}
              >
                {value}
              </Typography>
            </motion.div>
          )}
          
          {valueLabel && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mt: 0.5, opacity: 0.8 }}
            >
              {valueLabel}
            </Typography>
          )}
        </Box>

        {trend !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Tooltip title={`${trendIsPositive ? 'Increased' : 'Decreased'} by ${Math.abs(trend)}%`}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mt: 1,
                  p: 0.8,
                  width: 'fit-content',
                  borderRadius: '8px',
                  bgcolor: alpha(trendIsPositive ? theme.palette.success.main : theme.palette.error.main, 0.1)
                }}
              >
                <Box 
                  component={motion.div}
                  animate={{ 
                    rotate: [0, trendIsPositive ? 10 : -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    repeatDelay: 5
                  }}
                  sx={{ 
                    display: 'flex',
                    color: trendIsPositive ? theme.palette.success.main : theme.palette.error.main,
                    mr: 0.5,
                  }}
                >
                  {trendIsPositive ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    color: trendIsPositive ? theme.palette.success.main : theme.palette.error.main
                  }}
                >
                  {trendIsPositive ? '+' : ''}{trend}% {trendLabel && `(${trendLabel})`}
                </Typography>
              </Box>
            </Tooltip>
          </motion.div>
        )}
      </Box>
    </Paper>
  );
};

export default DashboardCard; 