import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SupportIcon from '@mui/icons-material/Support';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 50
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Card
        sx={{
          height: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 70px rgba(0, 0, 0, 0.18)',
          },
          overflow: 'visible',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -25,
            left: 32,
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          {icon}
        </Box>
        <CardContent sx={{ pt: 6, pb: 4, px: 4 }}>
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom 
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <SecurityIcon fontSize="large" />,
      title: 'Безопасность',
      description: 'Все транзакции защищены самыми современными технологиями блокчейна и проходят многоуровневую верификацию.'
    },
    {
      icon: <MoneyIcon fontSize="large" />,
      title: 'Высокая доходность',
      description: 'Инвестирование в токенизированные активы обеспечивает доходность выше традиционных финансовых инструментов.'
    },
    {
      icon: <AccessTimeIcon fontSize="large" />,
      title: 'Быстрый старт',
      description: 'Начните инвестировать всего за несколько минут после регистрации, без сложной бюрократии и ожидания.'
    },
    {
      icon: <VerifiedUserIcon fontSize="large" />,
      title: 'Проверенные проекты',
      description: 'Каждый проект на платформе проходит тщательную проверку нашей командой экспертов и юристов.'
    },
    {
      icon: <HandshakeIcon fontSize="large" />,
      title: 'Справедливые условия',
      description: 'Прозрачные правила для всех участников платформы с честным распределением прибыли и защитой инвесторов.'
    },
    {
      icon: <SupportIcon fontSize="large" />,
      title: 'Поддержка 24/7',
      description: 'Наша команда поддержки всегда готова ответить на ваши вопросы и помочь решить любые проблемы.'
    }
  ];
  
  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        backgroundColor: '#f8f9fa',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Декоративные элементы */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          right: '2%',
          width: '50%',
          height: '50%',
          opacity: 0.03,
          background: 'url(/images/pattern-dots.svg) repeat',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                background: `linear-gradient(135deg, #1a237e 0%, #3949ab 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Почему выбирают нас
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                maxWidth: 700,
                mx: 'auto',
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              Chihuahua Capital предлагает уникальные возможности для инвестирования и развития бизнеса
              на основе передовых финансовых технологий.
            </Typography>
          </motion.div>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
        
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          sx={{
            mt: 10,
            p: 5,
            borderRadius: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(57, 73, 171, 0.05) 100%)',
            border: '1px solid rgba(25, 118, 210, 0.1)',
          }}
        >
          <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
            Присоединяйтесь к экосистеме Chihuahua Capital
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>
            Более 10,000 инвесторов и 500 успешных проектов уже доверяют нашей платформе.
            Станьте частью растущего сообщества и получите доступ к уникальным возможностям.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection; 