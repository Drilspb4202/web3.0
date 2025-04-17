import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Tooltip,
  Avatar,
  alpha,
  useTheme
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion, AnimatePresence } from 'framer-motion';
import { shortenAddress } from '../utils';
import { toast } from 'react-toastify';
import { TokenInfo } from '../services/tokenFactory';

interface TokenCardProps {
  token: TokenInfo;
  onViewDetails: () => void;
  index: number;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, onViewDetails, index }) => {
  const theme = useTheme();
  
  const handleCopyAddress = (e: React.MouseEvent, address: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    toast.info('Адрес скопирован', { autoClose: 2000 });
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        onClick={onViewDetails}
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          background: theme.palette.mode === 'dark' 
            ? `linear-gradient(135deg, ${alpha('#1a2035', 0.9)}, ${alpha('#1a2035', 0.6)})`
            : `linear-gradient(135deg, ${alpha('#fff', 0.95)}, ${alpha('#f0f0f0', 0.85)})`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#fff', 0.7)}`,
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <Box 
          sx={{ 
            height: '6px', 
            width: '100%', 
            background: 'linear-gradient(90deg, #6c5ce7, #a29bfe)' 
          }} 
        />

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                mr: 2
              }}
            >
              {token.symbol.substring(0, 2)}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {token.name}
                {token.verified && (
                  <VerifiedIcon 
                    sx={{ 
                      ml: 0.5, 
                      color: theme.palette.primary.main,
                      fontSize: '0.9rem',
                      verticalAlign: 'middle'
                    }} 
                  />
                )}
              </Typography>
              <Chip 
                label={token.symbol} 
                size="small" 
                sx={{ 
                  mt: 0.5,
                  fontWeight: 'bold',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }} 
              />
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <PersonIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Creator
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {shortenAddress(token.creator)}
              </Typography>
              <Tooltip title="Copy address">
                <IconButton 
                  size="small" 
                  onClick={(e) => handleCopyAddress(e, token.creator)}
                  sx={{ ml: 0.5, p: 0.5 }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} /> Created
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {formatDate(token.timestamp)}
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Supply
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {token.totalSupply.toLocaleString()}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Tooltip title="View details">
              <IconButton 
                size="small"
                color="primary"
                onClick={onViewDetails}
                sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  }
                }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TokenCard; 