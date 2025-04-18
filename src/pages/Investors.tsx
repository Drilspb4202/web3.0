import React from 'react';
import { 
  Typography, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Avatar, 
  Chip,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';

const investors = [
  {
    name: "Алексей Иванов",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Ведущий инвестор",
    projects: 8,
    totalInvested: "250,000 AVAX",
    description: "Ведущий инвестор в сфере DeFi и блокчейн-проектов с опытом более 5 лет.",
    tags: ["DeFi", "NFT", "GameFi"]
  },
  {
    name: "Елена Петрова",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Ангельский инвестор",
    projects: 12,
    totalInvested: "180,000 AVAX",
    description: "Специалист по ранним инвестициям в технологические стартапы и блокчейн-проекты.",
    tags: ["Стартапы", "Инновации", "AI"]
  },
  {
    name: "Михаил Сидоров",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Инвестиционный менеджер",
    projects: 5,
    totalInvested: "120,000 AVAX",
    description: "Профессиональный инвестиционный менеджер с фокусом на проекты в сфере Web3.",
    tags: ["Web3", "Инфраструктура", "DAO"]
  },
  {
    name: "Наталья Козлова",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "Бизнес-ангел",
    projects: 7,
    totalInvested: "90,000 AVAX",
    description: "Инвестор в инновационные технологические решения с акцентом на устойчивое развитие.",
    tags: ["Экология", "SocialFi", "Импакт"]
  },
  {
    name: "Дмитрий Волков",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Венчурный капиталист",
    projects: 15,
    totalInvested: "320,000 AVAX",
    description: "Опытный венчурный инвестор с сильным техническим бэкграундом и пониманием рынка.",
    tags: ["Венчур", "Рынки", "Финтех"]
  },
  {
    name: "Ольга Смирнова",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Институциональный инвестор",
    projects: 10,
    totalInvested: "420,000 AVAX",
    description: "Представитель крупного фонда, специализирующегося на криптовалютных активах.",
    tags: ["Институции", "Высокий капитал", "DeFi 2.0"]
  }
];

const Investors: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, mt: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
            Инвесторы Chihuahua Capital
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Познакомьтесь с нашими ведущими инвесторами, которые поддерживают инновационные проекты на платформе
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </Box>
        
        <Grid container spacing={3}>
          {investors.map((investor, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className="card-hover" 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <Box sx={{ 
                    p: 3, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <Avatar 
                      src={investor.avatar} 
                      alt={investor.name} 
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mb: 2,
                        boxShadow: 'var(--shadow-md)'
                      }} 
                    />
                    <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                      {investor.name}
                    </Typography>
                    <Chip 
                      label={investor.role}
                      color="primary"
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  
                  <CardContent>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Проектов
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                            {investor.projects}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Инвестировано
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--secondary-color)' }}>
                            {investor.totalInvested}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {investor.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {investor.tags.map((tag, i) => (
                        <Chip 
                          key={i}
                          label={tag}
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(142, 68, 173, 0.1)', 
                            color: 'var(--primary-color)' 
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Investors; 