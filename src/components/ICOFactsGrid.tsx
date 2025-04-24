import React from 'react';
import { Grid, Paper, Typography, Box, useTheme, alpha, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TokenIcon from '@mui/icons-material/Token';
import LayersIcon from '@mui/icons-material/Layers';
import GavelIcon from '@mui/icons-material/Gavel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface FactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  index: number;
}

// Массив данных о фактах ICO
const icoFacts = [
  {
    icon: <TokenIcon />,
    title: 'Тикер: CHIH',
    description: 'Официальный символ токена Chihuahua Capital на всех торговых площадках',
    color: '#6a11cb'
  },
  {
    icon: <AccountBalanceIcon />,
    title: 'Первоначальная цена',
    description: '1 CHIH = 1,250₽ на стадии ICO, с последующим ростом на публичных торгах',
    color: '#2575fc'
  },
  {
    icon: <ShowChartIcon />,
    title: 'Механизм ценообразования',
    description: 'Автоматическая стабилизация цены через смарт-контракт и алгоритмы AMM',
    color: '#3a7bd5'
  },
  {
    icon: <GroupsIcon />,
    title: 'Распределение токенов',
    description: '60% - публичная продажа, 25% - команда, 10% - маркетинг, 5% - резерв',
    color: '#00d2ff'
  },
  {
    icon: <SettingsIcon />,
    title: 'Блокчейн',
    description: 'Основан на Avalanche C-Chain для обеспечения быстрых транзакций и низких комиссий',
    color: '#0061ff'
  },
  {
    icon: <LayersIcon />,
    title: 'Стандарт токена',
    description: 'Полностью совместим со стандартом ERC-20 для максимальной интеграции',
    color: '#6747c7'
  },
  {
    icon: <GavelIcon />,
    title: 'Правовой статус',
    description: 'Токен представляет права на долю в проекте согласно смарт-контракту',
    color: '#36096d'
  },
  {
    icon: <EmojiEventsIcon />,
    title: 'Бонусы первым',
    description: 'Первые 1000 инвесторов получат +15% токенов в качестве раннего бонуса',
    color: '#37b9f1'
  }
];

// Компонент карточки с фактом
const FactCard: React.FC<FactCardProps> = ({ icon, title, description, color = '#6a11cb', index }) => {
  const theme = useTheme();
  
  return (
    <Grid item xs={12} sm={6} md={3}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: 3,
            background: theme.palette.mode === 'dark'
              ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
              : `linear-gradient(145deg, ${alpha('#fff', 0.95)}, ${alpha('#f5f7fa', 0.85)})`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(color, 0.2)}`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            boxShadow: `0 10px 30px -10px ${alpha(color, 0.1)}`
          }}
        >
          {/* Декоративный градиент */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: `linear-gradient(145deg, ${alpha(color, 0.7)}, ${alpha(color, 0.3)})`,
              filter: 'blur(30px)',
              opacity: 0.5,
              zIndex: 0
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Avatar
              sx={{
                bgcolor: alpha(color, 0.1),
                color: color,
                width: 48,
                height: 48,
                mb: 2,
                boxShadow: `0 5px 15px ${alpha(color, 0.2)}`
              }}
            >
              {icon}
            </Avatar>
            
            <Typography 
              variant="h6" 
              component="h3" 
              gutterBottom 
              fontWeight="bold"
              sx={{
                background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {title}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Grid>
  );
};

const ICOFactsGrid: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {icoFacts.map((fact, index) => (
          <FactCard
            key={index}
            icon={fact.icon}
            title={fact.title}
            description={fact.description}
            color={fact.color}
            index={index}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ICOFactsGrid; 