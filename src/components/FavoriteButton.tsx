import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteService from '../services/favoriteService';

interface FavoriteButtonProps {
  projectId: number;
  initialFavorite?: boolean;
  onToggle?: (isFavorite: boolean) => void;
}

/**
 * Кнопка добавления/удаления проекта из избранного
 */
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  projectId, 
  initialFavorite = false, 
  onToggle 
}) => {
  const [isFavorite, setIsFavorite] = useState(
    initialFavorite || FavoriteService.isFavorite(projectId)
  );

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    
    const newState = FavoriteService.toggleFavorite(projectId);
    setIsFavorite(newState);
    
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <Tooltip title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}>
      <IconButton 
        onClick={handleToggleFavorite}
        color={isFavorite ? "error" : "default"}
        size="small"
        aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        sx={{ 
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton; 