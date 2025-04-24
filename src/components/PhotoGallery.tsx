import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

// Тип для объекта фотографии
interface PhotoItem {
  id: string;
  src: string;
  title: string;
  description: string;
}

// Пример данных для галереи
const galleryPhotos: PhotoItem[] = [
  {
    id: '1',
    src: '/images/chihuahua-coin.jpeg',
    title: 'Chihuahua Coin',
    description: 'Наш официальный токен с уникальным дизайном'
  },
  {
    id: '2',
    src: '/images/dashboard-preview.jpg',
    title: 'Панель управления',
    description: 'Интуитивный интерфейс для отслеживания инвестиций'
  },
  {
    id: '3',
    src: '/images/chihuahua-token.jpg',
    title: 'Токен в действии',
    description: 'Визуализация обмена токенов на нашей платформе'
  },
  {
    id: '4',
    src: '/images/logo.jpg',
    title: 'Логотип Chihuahua Capital',
    description: 'Наш узнаваемый бренд в мире криптоинвестиций'
  }
];

interface PhotoGalleryProps {
  title?: string;
  subtitle?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  title = 'Галерея проекта', 
  subtitle = 'Посмотрите на наши достижения и разработки в области криптоинвестиций'
}) => {
  const theme = useTheme();

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              fontWeight="bold"
              color="primary.main"
            >
              {title}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                fontSize: '1.1rem'
              }}
            >
              {subtitle}
            </Typography>
          </motion.div>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4}>
            {galleryPhotos.map((photo) => (
              <Grid item xs={12} sm={6} md={3} key={photo.id}>
                <motion.div variants={itemVariants}>
                  <Card 
                    elevation={3} 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8]
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={photo.src}
                      alt={photo.title}
                      sx={{ 
                        transition: 'all 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                        {photo.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {photo.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PhotoGallery; 