import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  Button, 
  useTheme, 
  alpha,
  Paper,
  Avatar,
  Divider,
  Tab,
  Tabs,
  IconButton,
  Skeleton,
  CircularProgress,
  Chip,
  useMediaQuery,
  Zoom,
  Fade,
  Slide
} from '@mui/material';
import DashboardCard from '../components/DashboardCard';
import { shortenAddress, formatNumber, formatAmount, formatPercentage } from '../utils';
import { Web3Context } from '../contexts/Web3Context';
import { motion } from 'framer-motion';

// Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TokenIcon from '@mui/icons-material/Token';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NetworkStats from '../components/NetworkStats';

// Sample data - in a real app, this would come from API
const dashboardStats = {
  totalInvestment: 250000,
  totalTokens: 15,
  activeInvestors: 128,
  marketVolume: 43250,
  recentPerformance: 8.2,
  topPerformers: [
    { id: 1, name: 'Bistro Milano', symbol: 'MLNO', value: 32500, change: 12.5 },
    { id: 2, name: 'Urban Coffee', symbol: 'UCOF', value: 28750, change: 8.7 },
    { id: 3, name: 'Tech Solutions Inc', symbol: 'TSOL', value: 41200, change: 5.2 },
    { id: 4, name: 'Green Farms', symbol: 'GRFM', value: 22800, change: -2.3 }
  ],
  recentActivity: [
    { 
      id: 1, 
      type: 'buy', 
      user: '0x1234...7890', 
      amount: 500, 
      token: 'MLNO', 
      tokenName: 'Bistro Milano',
      time: Date.now() - 1000 * 60 * 15 
    },
    { 
      id: 2, 
      type: 'tokenize', 
      user: '0x9876...5432', 
      token: 'GRFM', 
      tokenName: 'Green Farms',
      time: Date.now() - 1000 * 60 * 60 * 3 
    },
    { 
      id: 3, 
      type: 'sell', 
      user: '0x5678...1234', 
      amount: 200, 
      token: 'UCOF', 
      tokenName: 'Urban Coffee',
      time: Date.now() - 1000 * 60 * 60 * 12 
    },
    { 
      id: 4, 
      type: 'dividend', 
      token: 'TSOL', 
      tokenName: 'Tech Solutions Inc',
      amount: 5000,
      time: Date.now() - 1000 * 60 * 60 * 24 
    },
  ]
};

// Format timestamp to relative time
const timeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  
  return 'just now';
};

// Activity item component
interface ActivityItemProps {
  activity: typeof dashboardStats.recentActivity[0];
  delay: number;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, delay }) => {
  const theme = useTheme();
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <TrendingUpIcon fontSize="small" />;
      case 'sell':
        return <TrendingDownIcon fontSize="small" />;
      case 'tokenize':
        return <TokenIcon fontSize="small" />;
      case 'dividend':
        return <AttachMoneyIcon fontSize="small" />;
      default:
        return <MoreVertIcon fontSize="small" />;
    }
  };
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'buy':
        return theme.palette.success.main;
      case 'sell':
        return theme.palette.error.main;
      case 'tokenize':
        return theme.palette.primary.main;
      case 'dividend':
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };
  
  const getActivityText = (activity: typeof dashboardStats.recentActivity[0]) => {
    switch (activity.type) {
      case 'buy':
        return `${shortenAddress(activity.user)} purchased ${formatAmount(activity.amount)} ${activity.token}`;
      case 'sell':
        return `${shortenAddress(activity.user)} sold ${formatAmount(activity.amount)} ${activity.token}`;
      case 'tokenize':
        return `${shortenAddress(activity.user)} tokenized ${activity.tokenName} as ${activity.token}`;
      case 'dividend':
        return `${activity.tokenName} distributed ${formatAmount(activity.amount)} in dividends`;
      default:
        return `Unknown activity with ${activity.token}`;
    }
  };
  
  return (
    <Fade in={true} style={{ transitionDelay: `${delay * 150}ms` }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay * 0.1 }}
        sx={{ 
          mb: 2,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 2,
          background: alpha(getActivityColor(activity.type), 0.05),
          '&:hover': {
            background: alpha(getActivityColor(activity.type), 0.1),
            transform: 'translateX(8px)',
            transition: 'all 0.3s ease'
          }
        }}
      >
        <Avatar
          sx={{
            mr: 2,
            bgcolor: alpha(getActivityColor(activity.type), 0.2),
            color: getActivityColor(activity.type)
          }}
        >
          {getActivityIcon(activity.type)}
        </Avatar>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {getActivityText(activity)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {activity.tokenName} • {activity.token}
          </Typography>
        </Box>
        
        <Chip 
          label={timeAgo(activity.time)}
          size="small"
          sx={{ 
            bgcolor: alpha(getActivityColor(activity.type), 0.1),
            color: getActivityColor(activity.type),
            fontWeight: 500
          }}
        />
      </Box>
    </Fade>
  );
};

// Dashboard Tab Component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { provider, networkStats, refreshNetworkStats, isLocalNode } = useContext(Web3Context);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleRefresh = () => {
    setLoading(true);
    refreshNetworkStats();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Dashboard Header */}
      <Fade in={true} timeout={800}>
        <Box sx={{ 
          mb: 4, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0
        }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                background: 'linear-gradient(90deg, #FF6B6B 0%, #FFE66D 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
              }}
            >
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Overview of your investments and tokenized assets
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />} 
              onClick={handleRefresh}
              sx={{
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              Refresh
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              href="/tokenize"
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(90deg, #FF6B6B 0%, #FFE66D 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)'
                }
              }}
            >
              Tokenize Business
            </Button>
          </Box>
        </Box>
      </Fade>
      
      {/* Network Stats */}
      {provider && (
        <Slide direction="up" in={true} timeout={500}>
          <Box sx={{ mb: 4 }}>
            <NetworkStats provider={provider} />
          </Box>
        </Slide>
      )}
      
      {/* Portfolio Performance Chart */}
      <Fade in={true} timeout={800}>
        <Paper sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, rgba(26, 32, 53, 0.9), rgba(28, 34, 55, 0.7))' 
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.7))',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'}`,
          position: 'relative',
        }}>
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '40%', 
            height: '100%', 
            opacity: 0.06,
            background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
            zIndex: 0
          }} />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Portfolio Performance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track your investment growth over time
                </Typography>
              </Box>
              
              <Box>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ 
                    borderRadius: 2, 
                    mr: 1,
                    borderColor: theme.palette.mode === 'dark' ? alpha('#fff', 0.2) : alpha('#000', 0.1),
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  1W
                </Button>
                <Button 
                  variant="contained" 
                  size="small" 
                  sx={{ 
                    borderRadius: 2, 
                    mr: 1,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                >
                  1M
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    borderRadius: 2,
                    borderColor: theme.palette.mode === 'dark' ? alpha('#fff', 0.2) : alpha('#000', 0.1),
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05)
                    }
                  }}
                >
                  1Y
                </Button>
              </Box>
            </Box>
            
            <Box sx={{ 
              height: 300, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}>
              {loading ? (
                <CircularProgress />
              ) : (
                <React.Fragment>
                  {/* Chart Placeholder - In a real app, use a charting library like recharts or chart.js */}
                  <Box 
                    component={motion.div}
                    initial={{ opacity: 0, scaleY: 0.7 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Simulated Chart Line */}
                    <Box 
                      component={motion.div}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      sx={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%', 
                        height: '100%',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `radial-gradient(circle at 70% 60%, ${alpha(theme.palette.primary.main, 0.8)}, transparent)`,
                          opacity: 0.3,
                          filter: 'blur(30px)',
                          borderRadius: '50%',
                          transform: 'scale(0.6, 0.3)'
                        }
                      }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
                        {/* Gradient for the area under the line */}
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity="0.5" />
                            <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Animated path for line */}
                        <motion.path
                          d="M0,250 C50,220 100,280 150,200 C200,120 250,180 300,150 C350,120 400,170 450,140 C500,110 550,60 600,90 C650,120 700,80 750,60 C800,40 850,90 900,70 C950,50 990,90 1000,80"
                          fill="none"
                          stroke={theme.palette.primary.main}
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        
                        {/* Area under the line */}
                        <motion.path
                          d="M0,250 C50,220 100,280 150,200 C200,120 250,180 300,150 C350,120 400,170 450,140 C500,110 550,60 600,90 C650,120 700,80 750,60 C800,40 850,90 900,70 C950,50 990,90 1000,80 L1000,300 L0,300 Z"
                          fill="url(#chartGradient)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                        />
                      </svg>
                    </Box>
                    
                    {/* Performance indicator */}
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        right: '10%', 
                        top: '30%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-end'
                      }}
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <Typography variant="h4" sx={{ 
                        fontWeight: 700, 
                        mb: 0.5,
                        background: 'linear-gradient(90deg, #FF6B6B 30%, #FFE66D 100%)',
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                      }}>
                        +{formatPercentage(dashboardStats.recentPerformance)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last 30 days
                      </Typography>
                    </Box>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Paper>
      </Fade>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="Total Investment"
                value={loading ? '—' : formatAmount(dashboardStats.totalInvestment)}
                valueLabel="Current portfolio value"
                trend={loading ? undefined : 5.4}
                trendLabel="past month"
                icon={<AttachMoneyIcon sx={{ color: '#fff' }} />}
                iconBgColor={theme.palette.primary.main}
              />
            </Box>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '200ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="Active Tokens"
                value={loading ? '—' : dashboardStats.totalTokens}
                valueLabel="Tokens in circulation"
                trend={loading ? undefined : 12.0}
                trendLabel="new this month"
                icon={<TokenIcon sx={{ color: '#fff' }} />}
                iconBgColor="#6c5ce7"
              />
            </Box>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '300ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="Active Investors"
                value={loading ? '—' : dashboardStats.activeInvestors}
                valueLabel="Platform users"
                trend={loading ? undefined : 8.7}
                trendLabel="growth rate"
                icon={<GroupIcon sx={{ color: '#fff' }} />}
                iconBgColor="#00b894"
              />
            </Box>
          </Zoom>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Zoom in={true} style={{ transitionDelay: '400ms' }}>
            <Box component={motion.div} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
              <DashboardCard
                title="Market Volume"
                value={loading ? '—' : formatAmount(dashboardStats.marketVolume)}
                valueLabel="24h trading volume"
                trend={loading ? undefined : 8.2}
                trendLabel="vs yesterday"
                icon={<ShowChartIcon sx={{ color: '#fff' }} />}
                iconBgColor="#FF6B6B"
              />
            </Box>
          </Zoom>
        </Grid>
      </Grid>
      
      {/* Main Dashboard Content */}
      <Box sx={{ mb: 4 }}>
        <Paper sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, rgba(26, 32, 53, 0.9), rgba(28, 34, 55, 0.7))' 
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.7))',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'}`,
        }}>
          <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Tabs 
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : undefined}
              sx={{ 
                '& .MuiTabs-indicator': {
                  backgroundColor: theme.palette.primary.main,
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                },
                '& .MuiTab-root': {
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                },
                '& .Mui-selected': {
                  color: theme.palette.primary.main
                }
              }}
            >
              <Tab label="Top Performers" />
              <Tab label="Recent Activity" />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            {loading ? (
              <Box sx={{ p: 3 }}>
                {[...Array(4)].map((_, index) => (
                  <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="60%" height={28} />
                      <Skeleton variant="text" width="40%" height={20} />
                    </Box>
                    <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ p: 3 }}>
                {dashboardStats.topPerformers.map((performer, index) => (
                  <Fade key={performer.id} in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                    <Box 
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      sx={{ 
                        mb: 2, 
                        p: 2, 
                        display: 'flex', 
                        alignItems: 'center',
                        borderRadius: 2,
                        background: alpha(theme.palette.primary.main, 0.05),
                        '&:hover': {
                          background: alpha(theme.palette.primary.main, 0.1),
                          transform: 'scale(1.02)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          mr: 2, 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 'bold'
                        }}
                      >
                        {performer.symbol.substring(0, 2)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {performer.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {performer.symbol} • {formatAmount(performer.value)}
                        </Typography>
                      </Box>
                      <Chip 
                        label={`${performer.change > 0 ? '+' : ''}${performer.change}%`}
                        color={performer.change > 0 ? 'success' : 'error'}
                        icon={performer.change > 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Fade>
                ))}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    View All Tokens
                  </Button>
                </Box>
              </Box>
            )}
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            {loading ? (
              <Box sx={{ p: 3 }}>
                {[...Array(3)].map((_, index) => (
                  <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width="70%" height={28} />
                      <Skeleton variant="text" width="50%" height={20} />
                    </Box>
                    <Skeleton variant="text" width={80} height={20} />
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ p: 3 }}>
                {dashboardStats.recentActivity.map((activity, index) => (
                  <ActivityItem key={activity.id} activity={activity} delay={index} />
                ))}
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    View All Activity
                  </Button>
                </Box>
              </Box>
            )}
          </TabPanel>
        </Paper>
      </Box>
      
      {/* Token Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={800}>
            <Paper sx={{ 
              borderRadius: 3, 
              overflow: 'hidden',
              height: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(145deg, rgba(26, 32, 53, 0.9), rgba(28, 34, 55, 0.7))' 
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.7))',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'}`,
            }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Token Distribution
                </Typography>
                
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box sx={{ height: 300, position: 'relative' }}>
                    {/* Donut Chart Placeholder */}
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {/* SVG Donut Chart */}
                      <Box sx={{ position: 'relative', width: 200, height: 200 }}>
                        <svg width="100%" height="100%" viewBox="0 0 42 42">
                          <defs>
                            <linearGradient id="donut1" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#6c5ce7" />
                              <stop offset="100%" stopColor="#a29bfe" />
                            </linearGradient>
                            <linearGradient id="donut2" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#00b894" />
                              <stop offset="100%" stopColor="#55efc4" />
                            </linearGradient>
                            <linearGradient id="donut3" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#ff7675" />
                              <stop offset="100%" stopColor="#ff9f43" />
                            </linearGradient>
                            <linearGradient id="donut4" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#fd79a8" />
                              <stop offset="100%" stopColor="#e84393" />
                            </linearGradient>
                          </defs>
                          
                          {/* Background Circle */}
                          <circle cx="21" cy="21" r="15.91549430918954" fill="none" stroke={alpha(theme.palette.divider, 0.3)} strokeWidth="3" />
                          
                          {/* Animated Segments */}
                          <motion.circle
                            cx="21"
                            cy="21"
                            r="15.91549430918954"
                            fill="none"
                            stroke="url(#donut1)"
                            strokeWidth="3"
                            strokeDasharray="35 65"
                            strokeDashoffset="25"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 25 }}
                            transition={{ duration: 1, delay: 0.1 }}
                          />
                          <motion.circle
                            cx="21"
                            cy="21"
                            r="15.91549430918954"
                            fill="none"
                            stroke="url(#donut2)"
                            strokeWidth="3"
                            strokeDasharray="25 75"
                            strokeDashoffset="60"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 60 }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                          <motion.circle
                            cx="21"
                            cy="21"
                            r="15.91549430918954"
                            fill="none"
                            stroke="url(#donut3)"
                            strokeWidth="3"
                            strokeDasharray="20 80"
                            strokeDashoffset="85"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 85 }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                          <motion.circle
                            cx="21"
                            cy="21"
                            r="15.91549430918954"
                            fill="none"
                            stroke="url(#donut4)"
                            strokeWidth="3"
                            strokeDasharray="20 80"
                            strokeDashoffset="5"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 5 }}
                            transition={{ duration: 1, delay: 0.4 }}
                          />
                        </svg>
                        <Box sx={{ 
                          position: 'absolute', 
                          top: '50%', 
                          left: '50%', 
                          transform: 'translate(-50%, -50%)', 
                          textAlign: 'center' 
                        }}>
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {dashboardStats.totalTokens}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tokens
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Legend */}
                      <Box sx={{ 
                        position: 'absolute', 
                        right: 0, 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                      }}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: 1,
                              background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)',
                              mr: 1
                            }} />
                            <Typography variant="body2">Hospitality (35%)</Typography>
                          </Box>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: 1,
                              background: 'linear-gradient(90deg, #00b894, #55efc4)',
                              mr: 1
                            }} />
                            <Typography variant="body2">Retail (25%)</Typography>
                          </Box>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: 1,
                              background: 'linear-gradient(90deg, #ff7675, #ff9f43)',
                              mr: 1
                            }} />
                            <Typography variant="body2">Technology (20%)</Typography>
                          </Box>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.8 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: 1,
                              background: 'linear-gradient(90deg, #fd79a8, #e84393)',
                              mr: 1
                            }} />
                            <Typography variant="body2">Services (20%)</Typography>
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Fade>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
            <Paper sx={{ 
              borderRadius: 3, 
              overflow: 'hidden',
              height: '100%',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(145deg, rgba(26, 32, 53, 0.9), rgba(28, 34, 55, 0.7))' 
                : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.7))',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'}`,
            }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Top Tokens by Performance
                </Typography>
                
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Box sx={{ height: 300 }}>
                    {dashboardStats.topPerformers.map((token, index) => (
                      <Box 
                        key={token.id}
                        component={motion.div}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          p: 1.5,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            transform: 'translateX(5px)'
                          }
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          component="span" 
                          sx={{ 
                            fontWeight: 700, 
                            width: 24, 
                            height: 24, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderRadius: '50%', 
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            mr: 2
                          }}
                        >
                          {index + 1}
                        </Typography>
                        
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {token.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {token.symbol}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {formatAmount(token.value)}
                          </Typography>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'flex-end',
                              color: token.change > 0 ? theme.palette.success.main : theme.palette.error.main
                            }}
                          >
                            {token.change > 0 ? <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />}
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 600,
                                color: token.change > 0 ? theme.palette.success.main : theme.palette.error.main
                              }}
                            >
                              {token.change > 0 ? '+' : ''}{token.change}%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 