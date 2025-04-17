import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  ButtonGroup, 
  Button, 
  CircularProgress,
  useMediaQuery,
  Tooltip,
  Fade,
  Skeleton,
  Stack
} from '@mui/material';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,

  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShowChartIcon from '@mui/icons-material/ShowChart';

// Define chart time range options
const TIME_RANGES = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '1M', value: '30d' },
  { label: '3M', value: '90d' },
  { label: '1Y', value: '365d' },
  { label: 'All', value: 'all' },
];

// Define price data structure
interface PricePoint {
  timestamp: number;
  price: number;
  volume?: number;
}

interface PriceChartProps {
  tokenId?: string;
  tokenSymbol?: string;
  showVolume?: boolean;
  height?: number;
  isLoading?: boolean;
  customData?: PricePoint[];
  onTimeRangeChange?: (range: string) => void;
}

// Styled components
const ChartCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(135deg, rgba(32,33,46,0.8) 0%, rgba(32,33,46,0.6) 100%)' 
    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,242,245,0.8) 100%)',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 10px 25px rgba(0,0,0,0.3)'
    : '0 10px 25px rgba(0,0,0,0.1)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 15px 30px rgba(0,0,0,0.4)'
      : '0 15px 30px rgba(0,0,0,0.15)',
  },
}));

const TimeRangeButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.75rem',
  padding: '4px 10px',
  minWidth: 40,
  borderRadius: 8,
}));

const CustomTooltipContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(32,33,46,0.95)' : 'rgba(255,255,255,0.95)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(1.5),
  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  backdropFilter: 'blur(10px)',
  maxWidth: 200,
}));

const ChartGradient = ({ id, color, theme }: { id: string, color: string, theme: any }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color} stopOpacity={0.35} />
      <stop offset="95%" stopColor={color} stopOpacity={0.05} />
    </linearGradient>
  </defs>
);

// Helper to format date from timestamp
const formatDate = (timestamp: number, range?: string) => {
  const date = new Date(timestamp);
  if (range === '24h') {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (range === '7d' || range === '30d') {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: '2-digit' });
  }
};

// Helper to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price);
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label, range }: any) => {
  if (active && payload && payload.length) {
    const priceData = payload[0].payload;
    const formattedDate = formatDate(priceData.timestamp, range);
    const formattedPrice = formatPrice(priceData.price);
    
    return (
      <CustomTooltipContainer>
        <Typography variant="caption" color="text.secondary">
          {formattedDate}
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} mt={0.5}>
          {formattedPrice}
        </Typography>
        {priceData.volume !== undefined && (
          <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
            Volume: {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(priceData.volume)}
          </Typography>
        )}
      </CustomTooltipContainer>
    );
  }
  return null;
};

// Main PriceChart component
const PriceChart: React.FC<PriceChartProps> = ({
  tokenId,
  tokenSymbol = 'CHIH',
  showVolume = true,
  height = 350,
  isLoading = false,
  customData,
  onTimeRangeChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedRange, setSelectedRange] = useState(TIME_RANGES[0].value);
  const [chartData, setChartData] = useState<PricePoint[]>([]);
  const [dataChange, setDataChange] = useState<{ percentage: number, positive: boolean }>({ percentage: 0, positive: true });
  const [loading, setLoading] = useState(true);

  // Color scheme based on the theme and price direction
  const chartColor = useMemo(() => {
    return dataChange.positive 
      ? theme.palette.success.main 
      : theme.palette.error.main;
  }, [dataChange.positive, theme.palette]);

  // Generate mock data when no custom data is provided
  const generateMockData = useCallback((range: string) => {
    const now = new Date();
    const data: PricePoint[] = [];
    let duration: number;
    let interval: number;
    let basePrice = 0.0025; // Base price in USD
    let volatility = 0.08; // Price volatility percentage
    
    // Configure time parameters based on range
    switch (range) {
      case '24h':
        duration = 24 * 60 * 60 * 1000; // 24 hours in ms
        interval = 60 * 60 * 1000; // 1 hour interval
        volatility = 0.05;
        break;
      case '7d':
        duration = 7 * 24 * 60 * 60 * 1000;
        interval = 6 * 60 * 60 * 1000; // 6 hours interval
        volatility = 0.1;
        break;
      case '30d':
        duration = 30 * 24 * 60 * 60 * 1000;
        interval = 24 * 60 * 60 * 1000; // 1 day interval
        volatility = 0.15;
        break;
      case '90d':
        duration = 90 * 24 * 60 * 60 * 1000;
        interval = 3 * 24 * 60 * 60 * 1000; // 3 days interval
        volatility = 0.25;
        break;
      case '365d':
        duration = 365 * 24 * 60 * 60 * 1000;
        interval = 14 * 24 * 60 * 60 * 1000; // 2 weeks interval
        volatility = 0.4;
        break;
      default: // 'all'
        duration = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years
        interval = 30 * 24 * 60 * 60 * 1000; // 1 month interval
        volatility = 0.6;
    }
    
    // Generate price points
    const startTime = now.getTime() - duration;
    let lastPrice = basePrice;
    let trend = 0.01; // Small upward trend
    
    // Create data points from past to present
    for (let timestamp = startTime; timestamp <= now.getTime(); timestamp += interval) {
      // Add some randomness to the price
      const randomFactor = 1 + ((Math.random() - 0.5) * volatility);
      lastPrice = lastPrice * randomFactor;
      
      // Add slight trend factor
      lastPrice = lastPrice * (1 + trend);
      
      // Add trading volume (random, but higher on price movements)
      const priceMovement = Math.abs(randomFactor - 1);
      const volume = 10000 + (Math.random() * 50000 * priceMovement);
      
      data.push({
        timestamp,
        price: parseFloat(lastPrice.toFixed(6)),
        volume: Math.round(volume)
      });
    }
    
    // Calculate percentage change
    if (data.length >= 2) {
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const change = ((lastPrice - firstPrice) / firstPrice) * 100;
      setDataChange({
        percentage: Math.abs(change),
        positive: change >= 0
      });
    }
    
    return data;
  }, []);

  // Fetch or generate chart data when range changes
  useEffect(() => {
    setLoading(true);
    
    // If custom data is provided, use it
    if (customData) {
      setChartData(customData);
      
      // Calculate percentage change
      if (customData.length >= 2) {
        const firstPrice = customData[0].price;
        const lastPrice = customData[customData.length - 1].price;
        const change = ((lastPrice - firstPrice) / firstPrice) * 100;
        setDataChange({
          percentage: Math.abs(change),
          positive: change >= 0
        });
      }
      
      setLoading(false);
      return;
    }
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const newData = generateMockData(selectedRange);
      setChartData(newData);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [selectedRange, customData, generateMockData]);

  // Handle range button click
  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };

  // Format y-axis ticks
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <Fade in={true} timeout={500}>
      <ChartCard>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                {tokenSymbol} Price
                <Typography 
                  component="span" 
                  variant="caption" 
                  sx={{ 
                    ml: 1,
                    color: dataChange.positive ? 'success.main' : 'error.main',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  {dataChange.positive ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  {dataChange.percentage.toFixed(2)}%
                </Typography>
              </Typography>
              
              {!loading && chartData.length > 0 && (
                <Typography variant="h5" fontWeight={800}>
                  {formatPrice(chartData[chartData.length - 1].price)}
                </Typography>
              )}
              
              {loading && (
                <Skeleton variant="text" width={120} height={40} />
              )}
            </Box>
            
            <ButtonGroup 
              variant="outlined" 
              size="small" 
              aria-label="time range selection"
              sx={{ 
                borderRadius: 2,
                '.MuiButtonGroup-grouped': {
                  borderRadius: 2,
                  minWidth: isMobile ? 30 : 40,
                },
              }}
            >
              {TIME_RANGES.map((range) => (
                <TimeRangeButton
                  key={range.value}
                  onClick={() => handleRangeChange(range.value)}
                  variant={selectedRange === range.value ? 'contained' : 'outlined'}
                  disableElevation
                >
                  {isMobile && range.label === '24H' ? '1D' : range.label}
                </TimeRangeButton>
              ))}
            </ButtonGroup>
          </Box>
          
          <Box sx={{ height: height, position: 'relative' }}>
            {(loading || isLoading) ? (
              <Stack 
                direction="column" 
                justifyContent="center" 
                alignItems="center" 
                spacing={2}
                sx={{ height: '100%' }}
              >
                <CircularProgress size={40} />
                <Typography variant="caption" color="text.secondary">
                  Loading price data...
                </Typography>
              </Stack>
            ) : chartData.length === 0 ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <ShowChartIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="body2" color="text.secondary" align="center">
                  No price data available for this token.
                </Typography>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <ChartGradient id="colorPrice" color={chartColor} theme={theme} />
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(tick) => formatDate(tick, selectedRange)}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={false}
                    minTickGap={30}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={formatYAxis}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    width={50}
                    domain={['dataMin', 'dataMax']}
                  />
                  <RechartsTooltip
                    content={<CustomTooltip range={selectedRange} />}
                    cursor={{ stroke: theme.palette.divider, strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  {showVolume && (
                    <Legend 
                      verticalAlign="top" 
                      align="right" 
                      height={36} 
                      content={() => null} // Custom legend handled outside chart
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={chartColor}
                    fillOpacity={1}
                    fill={`url(#colorPrice)`}
                    strokeWidth={2}
                    activeDot={{ 
                      r: 6, 
                      stroke: theme.palette.background.paper,
                      strokeWidth: 2,
                      fill: chartColor 
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Box>
        </CardContent>
      </ChartCard>
    </Fade>
  );
};

export default PriceChart; 