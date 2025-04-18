import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  LinearProgress, 
  useTheme,
  CardActionArea,
  Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';

// Интерфейс для объекта проекта
export interface Project {
  id: string | number;
  name: string;
  description: string;
  logo: string;
  raised: number;
  goal: number;
  tokenPrice: number;
  currency: string;
  category: string;
}

interface PopularProjectsProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  maxShow?: number;
  category?: string;
}

const PopularProjects: React.FC<PopularProjectsProps> = ({ 
  projects, 
  title = "Популярные проекты", 
  subtitle = "Инвестируйте в будущее сегодня",
  maxShow = 3,
  category
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Расчет процента выполнения для каждого проекта
  const getProgress = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };
  
  // Форматирование числа для отображения
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };
  
  const displayedProjects = projects.slice(0, maxShow);
  
  return (
    <Box component="section" sx={{ py: 6 }}>
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 5, textAlign: 'center' }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          {title}
          {category && category !== 'все' && (
            <Typography component="span" color="primary.main" sx={{ ml: 1 }}>
              ({category})
            </Typography>
          )}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {displayedProjects.map((project, index) => (
          <Grid 
            item 
            xs={12} 
            md={4} 
            key={project.id}
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-8px)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
                }
              }}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
                <CardMedia
                  component="img"
                  height="180"
                  image={project.logo}
                  alt={project.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    noWrap 
                    sx={{ fontWeight: 'bold' }}
                  >
                    {project.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: '4.5em'
                    }}
                  >
                    {project.description}
                  </Typography>
                  
                  <Stack spacing={1.5} sx={{ mt: 3 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Прогресс сбора средств
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={getProgress(project.raised, project.goal)}
                        sx={{ 
                          mt: 0.5, 
                          height: 8, 
                          borderRadius: 5,
                          bgcolor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                          }
                        }}
                      />
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          mt: 0.5 
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {formatNumber(project.raised)} {project.currency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatNumber(project.goal)} {project.currency}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Цена токена:
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                        {project.tokenPrice} {project.currency}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {projects.length > maxShow && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4 
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Button 
            variant="outlined" 
            color="primary" 
            size="large" 
            endIcon={<ArrowForward />}
            onClick={() => navigate('/projects')}
            sx={{ 
              borderRadius: 28,
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              }
            }}
          >
            Смотреть все проекты
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PopularProjects; 