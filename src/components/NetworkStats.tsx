import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  useTheme, 
  alpha,
  CircularProgress, 
  Tooltip,
  Skeleton
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { ethers } from 'ethers';

// Animated number counter
const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    controls.start({ opacity: 1, y: 0 });
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration, controls]);
  
  return <span>{count.toLocaleString()}</span>;
};

// Stat card component
const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = '#6c5ce7',
  isLoading = false,
  delay = 0
}: { 
  title: string; 
  value: number | string; 
  icon: React.ReactNode; 
  color?: string;
  isLoading?: boolean;
  delay?: number;
}) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20, 
        delay 
      }}
    >
      <Card
        component={motion.div}
        whileHover={{ 
          y: -5,
          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
          transition: { duration: 0.2 }
        }}
        sx={{
          height: '100%',
          borderRadius: 3,
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(145deg, ${alpha('#1a2035', 0.8)}, ${alpha('#1a2035', 0.5)})` 
            : `linear-gradient(145deg, ${alpha('#fff', 0.95)}, ${alpha('#fafafa', 0.85)})`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#fff', 0.7)}`,
          position: 'relative',
          overflow: 'hidden',
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.5)})`,
          }
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 2,
                backgroundColor: alpha(color, 0.1),
                color: color,
                mr: 1.5
              }}
            >
              {icon}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.7 }}>
              {title}
            </Typography>
          </Box>
          
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 0.5,
              lineHeight: 1.2
            }}
          >
            {isLoading ? (
              <Skeleton width={80} height={36} animation="wave" />
            ) : (
              typeof value === 'number' ? <AnimatedCounter value={value} /> : value
            )}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const NetworkStats: React.FC<{ provider?: any }> = ({ provider }) => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    blockNumber: 0,
    transactions: 0,
    activeWallets: 0,
    gasPrice: '0',
    blockTime: '0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (provider) {
      fetchStats();
      
      // Update stats every 15 seconds
      const interval = setInterval(fetchStats, 15000);
      return () => clearInterval(interval);
    }
  }, [provider]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Get current block number
      const blockNumber = await provider.getBlockNumber();
      
      // Get the block
      const block = await provider.getBlock(blockNumber);
      
      // Get the gas price
      const gasPrice = parseFloat(ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')).toFixed(2);
      
      // Mock data for active wallets (would be fetched from an API in production)
      const activeWallets = Math.floor(Math.random() * 1000) + 500;
      
      // Block time in seconds (mock data)
      const blockTime = (Math.random() * 2 + 2).toFixed(1);
      
      setStats({
        blockNumber,
        transactions: block.transactions.length,
        activeWallets,
        gasPrice,
        blockTime
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching network stats:', error);
      setLoading(false);
    }
  };

  if (!provider) {
    return null;
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        position: 'relative',
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        mb: 4,
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha('#131b2e', 0.8)}, ${alpha('#1f2a43', 0.3)})`
          : `linear-gradient(135deg, ${alpha('#f5f7ff', 0.8)}, ${alpha('#eef2ff', 0.3)})`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#ffffff', 0.05) : alpha('#000000', 0.05)}`,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at top right, rgba(108, 92, 231, 0.15), transparent 70%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Box sx={{ mb: 2, position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h5" 
          component={motion.h5}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ 
            fontWeight: 700,
            mb: 0.5,
            background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          Network Statistics
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Real-time metrics from the Avalanche blockchain
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={40} sx={{ color: '#6c5ce7' }} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6} md={4} lg={2.4}>
            <StatCard 
              title="Block Height" 
              value={stats.blockNumber} 
              icon={<BarChartIcon />} 
              color="#6c5ce7"
              isLoading={loading}
              delay={0.1}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
            <StatCard 
              title="Transactions" 
              value={stats.transactions} 
              icon={<CompareArrowsIcon />} 
              color="#00cec9"
              isLoading={loading}
              delay={0.2}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2.4}>
            <StatCard 
              title="Active Wallets" 
              value={stats.activeWallets} 
              icon={<PeopleIcon />} 
              color="#fd79a8"
              isLoading={loading}
              delay={0.3}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={2.4}>
            <StatCard 
              title="Gas Price" 
              value={stats.gasPrice} 
              icon={<AccountBalanceWalletIcon />} 
              color="#fdcb6e"
              isLoading={loading}
              delay={0.4}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.4}>
            <StatCard 
              title="Block Time" 
              value={stats.blockTime} 
              icon={<ScheduleIcon />} 
              color="#55efc4"
              isLoading={loading}
              delay={0.5}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default NetworkStats; 