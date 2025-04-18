import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Avatar, 
  Button, 
  LinearProgress, 
  Chip,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FavoriteService from '../services/favoriteService';
import FavoriteButton from './FavoriteButton';
import NotificationService from '../services/notificationService';
import { Project } from '../types';

interface FavoritesListProps {
  projects: Project[];
  onRemoveFromFavorites?: () => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ projects, onRemoveFromFavorites }) => {
  const [favoriteProjects, setFavoriteProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const favoriteIds = FavoriteService.getFavoriteIds();
    const filtered = projects.filter(project => favoriteIds.includes(project.id));
    setFavoriteProjects(filtered);
  }, [projects]);

  const handleViewProject = (projectId: number) => {
    navigate(`/tokens/${projectId}`);
  };

  const handleRemoveFromFavorites = (projectId: number) => {
    FavoriteService.removeFavorite(projectId);
    setFavoriteProjects(prev => prev.filter(project => project.id !== projectId));
    
    // Создаем уведомление об удалении из избранного
    NotificationService.addNotification({
      title: 'Проект удален из избранного',
      message: 'Проект был удален из списка избранных',
      type: 'info',
      projectId
    });
    
    if (onRemoveFromFavorites) {
      onRemoveFromFavorites();
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'var(--warning-color)';
    if (progress < 70) return 'var(--info-color)';
    return 'var(--success-color)';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (favoriteProjects.length === 0) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          textAlign: 'center', 
          borderRadius: 'var(--radius-lg)',
          background: theme.palette.mode === 'dark' 
            ? alpha('#1a2035', 0.5)
            : alpha('#f5f5f5', 0.5)
        }}
      >
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ mb: 2 }}
        >
          У вас пока нет избранных проектов
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/tokens')}
          sx={{ 
            background: 'var(--gradient-primary)',
            textTransform: 'none'
          }}
        >
          Смотреть все проекты
        </Button>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Избранные проекты
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/tokens')}
          size="small"
          sx={{ textTransform: 'none' }}
        >
          Все проекты
        </Button>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          <AnimatePresence>
            {favoriteProjects.map((project) => {
              const progress = project.raised && project.goal 
                ? Math.round((project.raised / project.goal) * 100)
                : 0;
              
              return (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <motion.div 
                    variants={itemVariants}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <Card 
                      className="card-hover" 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-md)',
                        position: 'relative'
                      }}
                    >
                      <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                        <FavoriteButton 
                          projectId={project.id}
                          initialFavorite={true}
                          onToggle={(isFavorite) => {
                            if (!isFavorite) {
                              handleRemoveFromFavorites(project.id);
                            }
                          }}
                        />
                      </Box>
                      
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`https://source.unsplash.com/random/600x200/?${project.category.toLowerCase()},business`}
                          alt={project.name}
                        />
                        <Avatar
                          src={project.logo}
                          alt={project.name}
                          sx={{
                            width: 70,
                            height: 70,
                            position: 'absolute',
                            bottom: -30,
                            left: 20,
                            border: '4px solid white',
                            boxShadow: 'var(--shadow-md)'
                          }}
                        />
                      </Box>
                      
                      <CardContent sx={{ pt: 4, pb: 2, px: 3, flexGrow: 1 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {project.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {project.description}
                          </Typography>
                        </Box>
                        
                        {project.raised && project.goal ? (
                          <Box sx={{ mt: 'auto' }}>
                            <Box sx={{ mb: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="body2" fontWeight="bold">
                                  Сбор средств:
                                </Typography>
                                <Typography variant="body2">
                                  {progress}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={progress} 
                                sx={{ 
                                  height: 8, 
                                  borderRadius: 4,
                                  bgcolor: 'rgba(0,0,0,0.05)',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: getProgressColor(progress)
                                  }
                                }} 
                              />
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                              <Typography variant="body2" color="text.secondary">
                                Собрано: <strong>{project.raised.toLocaleString()} ₽</strong>
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Цель: <strong>{project.goal.toLocaleString()} ₽</strong>
                              </Typography>
                            </Box>
                            
                            {project.tokenPrice && project.currency && (
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Chip 
                                  label={`${project.tokenPrice} ${project.currency}`}
                                  color="primary"
                                  size="small"
                                  icon={<LocalAtmIcon />}
                                  sx={{ fontWeight: 'bold' }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  Токенов: {Math.round(project.goal / project.tokenPrice).toLocaleString()}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        ) : (
                          <Box sx={{ mt: 'auto' }}>
                            <Chip 
                              label={project.status || "В разработке"}
                              color="secondary"
                              sx={{ fontWeight: 'bold', mt: 2 }}
                            />
                          </Box>
                        )}
                      </CardContent>
                      
                      <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                        <Button 
                          size="small" 
                          onClick={() => handleViewProject(project.id)}
                          sx={{ textTransform: 'none' }}
                        >
                          Подробнее
                        </Button>
                        
                        {project.raised && project.goal && (
                          <Button 
                            variant="contained" 
                            size="medium"
                            sx={{ 
                              background: 'var(--gradient-primary)',
                              fontWeight: 'bold',
                              textTransform: 'none',
                              px: 3,
                              '&:hover': {
                                boxShadow: 'var(--shadow-lg)'
                              }
                            }}
                          >
                            Инвестировать
                          </Button>
                        )}
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default FavoritesList; 