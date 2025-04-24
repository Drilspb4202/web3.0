import React, { useState, useEffect, useContext } from 'react';
import { 
  IconButton, 
  Tooltip, 
  CircularProgress 
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Web3Context } from '../contexts/Web3Context';
import { toggleFavoriteToken, isTokenFavorite } from '../services/userTokens';
import { toast } from 'react-toastify';

interface TokenFavoriteButtonProps {
  tokenAddress: string;
  tokenName: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  onToggle?: (isFavorite: boolean) => void;
}

const TokenFavoriteButton: React.FC<TokenFavoriteButtonProps> = ({
  tokenAddress,
  tokenName,
  size = 'medium',
  color = '#FFD700', // Default gold color for star
  onToggle
}) => {
  const { account } = useContext(Web3Context);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if token is in user's favorites
  useEffect(() => {
    if (!account) return;
    setIsFavorite(isTokenFavorite(account, tokenAddress));
  }, [account, tokenAddress]);

  const handleToggleFavorite = () => {
    if (!account) {
      toast.warning("Пожалуйста, подключите кошелёк", { autoClose: 3000 });
      return;
    }
    
    setLoading(true);
    
    try {
      const newStatus = toggleFavoriteToken(account, tokenAddress);
      setIsFavorite(newStatus);
      
      // Callback for parent components
      if (onToggle) onToggle(newStatus);
      
      if (newStatus) {
        toast.success(`${tokenName} добавлен в избранное`, { autoClose: 2000 });
      } else {
        toast.info(`${tokenName} удален из избранного`, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      toast.error("Не удалось изменить статус избранного", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}>
      <IconButton
        onClick={handleToggleFavorite}
        disabled={loading}
        size={size}
        sx={{ 
          color: isFavorite ? color : 'inherit'
        }}
      >
        {loading ? (
          <CircularProgress size={size === 'small' ? 16 : 24} color="inherit" />
        ) : isFavorite ? (
          <StarIcon />
        ) : (
          <StarBorderIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default TokenFavoriteButton; 