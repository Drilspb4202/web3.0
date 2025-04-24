import React, { useState, useEffect, useContext } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  IconButton, 
  Divider, 
  Paper, 
  Button,
  Grid,
  Tooltip,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import { Web3Context } from '../contexts/Web3Context';
import { TokenInfo } from '../services/tokenFactory';
import { 
  getUserTokens, 
  toggleFavoriteToken, 
  isTokenFavorite, 
  getUserFavoriteTokens,
  removeUserToken
} from '../services/userTokens';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TokenIcon from '@mui/icons-material/Token';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface UserTokensListProps {
  showFavoritesOnly?: boolean;
}

const UserTokensList: React.FC<UserTokensListProps> = ({ showFavoritesOnly = false }) => {
  const { account } = useContext(Web3Context);
  const [userTokens, setUserTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (!account) {
        setUserTokens([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // This is mocked data since we don't have a real token lookup function
        // In a real app, you would fetch actual token data from the blockchain
        const mockTokens: TokenInfo[] = [
          {
            tokenAddress: "0x1234567890123456789012345678901234567890",
            name: "Coffee Shop Token",
            symbol: "CST",
            creator: account,
            timestamp: Date.now() - 86400000 * 30, // 30 days ago
            totalSupply: 100000,
            verified: true
          },
          {
            tokenAddress: "0x2345678901234567890123456789012345678901",
            name: "BookStore Token",
            symbol: "BST",
            creator: account,
            timestamp: Date.now() - 86400000 * 15, // 15 days ago
            totalSupply: 50000,
            verified: true
          },
          {
            tokenAddress: "0x3456789012345678901234567890123456789012",
            name: "Bakery Token",
            symbol: "BKT",
            creator: "0xabcdef1234567890abcdef1234567890abcdefab",
            timestamp: Date.now() - 86400000 * 7, // 7 days ago
            totalSupply: 75000,
            verified: false
          }
        ];

        // Get user's token bindings
        const userBinding = getUserTokens(account);
        const favoriteTokens = getUserFavoriteTokens(account);
        
        if (showFavoritesOnly) {
          // Filter to only show favorites
          const filteredTokens = mockTokens.filter(token => 
            favoriteTokens.includes(token.tokenAddress)
          );
          setUserTokens(filteredTokens);
        } else {
          // Show all tokens (in a real app, filter by those the user owns)
          setUserTokens(mockTokens);
        }
      } catch (err: any) {
        console.error('Error fetching user tokens:', err);
        setError(err.message || 'Failed to load tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTokens();
  }, [account, showFavoritesOnly]);

  const handleToggleFavorite = (tokenAddress: string) => {
    if (!account) return;
    
    const newStatus = toggleFavoriteToken(account, tokenAddress);
    console.log(`Token ${tokenAddress} is ${newStatus ? 'now' : 'no longer'} a favorite`);
    
    // Force re-render to update UI
    setUserTokens([...userTokens]);
  };

  const handleRemoveToken = (tokenAddress: string) => {
    if (!account) return;
    
    removeUserToken(account, tokenAddress);
    
    // Update the UI
    setUserTokens(userTokens.filter(token => token.tokenAddress !== tokenAddress));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (userTokens.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <TokenIcon sx={{ fontSize: 60, color: 'var(--primary-light)', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {showFavoritesOnly ? 'У вас пока нет избранных токенов' : 'У вас пока нет токенов'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {showFavoritesOnly 
            ? 'Добавьте токены в избранное, чтобы они отображались здесь'
            : 'Создайте свой первый токен или добавьте существующие токены в свой портфель'
          }
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/create-token"
          sx={{ 
            background: 'var(--gradient-primary)',
            '&:hover': {
              boxShadow: 'var(--shadow-md)'
            }
          }}
        >
          Создать токен
        </Button>
      </Paper>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container spacing={2}>
        {userTokens.map((token) => (
          <Grid item xs={12} md={6} key={token.tokenAddress}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 'var(--shadow-md)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TokenIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component={Link} to={`/tokens/${token.tokenAddress}`} sx={{ 
                      color: 'var(--primary-color)',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}>
                      {token.name}
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Tooltip title={isTokenFavorite(account || '', token.tokenAddress) ? 'Удалить из избранного' : 'Добавить в избранное'}>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleFavorite(token.tokenAddress)}
                        sx={{ color: isTokenFavorite(account || '', token.tokenAddress) ? '#FFD700' : 'inherit' }}
                      >
                        {isTokenFavorite(account || '', token.tokenAddress) ? <StarIcon /> : <StarBorderIcon />}
                      </IconButton>
                    </Tooltip>
                    
                    {token.creator === account && (
                      <Tooltip title="Удалить токен">
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveToken(token.tokenAddress)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip 
                    label={token.symbol} 
                    size="small" 
                    color="primary" 
                    sx={{ mr: 1, fontWeight: 'bold' }} 
                  />
                  {token.verified && (
                    <Chip 
                      label="Verified" 
                      size="small" 
                      color="success" 
                      sx={{ fontWeight: 'bold' }} 
                    />
                  )}
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Supply: {token.totalSupply.toLocaleString()} {token.symbol}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(token.timestamp).toLocaleDateString()}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    to={`/tokens/${token.tokenAddress}`}
                  >
                    Подробнее
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

export default UserTokensList; 