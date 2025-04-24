import React, { useState, useRef, ReactNode } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  useTheme, 
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  alpha
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';
import CryptoChart from '../components/CryptoChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

// Типизация компонентов
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

interface ParallaxSectionProps {
  children: ReactNode;
}

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  index: number;
}

// Компонент преимуществ с анимацией
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 50, 
              height: 50,
              background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
              boxShadow: '0 10px 20px rgba(106, 17, 203, 0.3)',
              mr: 2
            }}
          >
            {icon}
          </Avatar>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ fontWeight: 'bold' }}
          >
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.9 }}>
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

// Компонент с параллакс-эффектом для графика
const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <Box ref={ref} sx={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </Box>
  );
};

// Компонент проекта
const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, raised, goal, index }) => {
  const percentage = Math.round((raised / goal) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card 
        sx={{ 
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 3,
          '&:hover': {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          },
          transition: 'all 0.3s ease'
        }}
      >
        <Box 
          sx={{ 
            height: 200, 
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
              px: 2,
              py: 0.5,
              borderRadius: 5,
              fontWeight: 'bold',
              boxShadow: '0 5px 15px rgba(106, 17, 203, 0.3)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              {percentage}% собрано
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Собрано</Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{raised.toLocaleString()}₽</Typography>
            </Box>
            <Box 
              sx={{ 
                height: 6, 
                bgcolor: 'background.paper', 
                borderRadius: 3, 
                overflow: 'hidden',
                opacity: 0.3
              }}
            >
              <Box 
                sx={{ 
                  height: '100%', 
                  width: `${percentage}%`, 
                  background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                  borderRadius: 3
                }} 
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">Цель</Typography>
              <Typography variant="body2">{goal.toLocaleString()}₽</Typography>
            </Box>
          </Box>
          
          <Button 
            variant="contained"
            fullWidth
            sx={{ 
              background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
              borderRadius: 3,
              py: 1,
              fontWeight: 'bold',
              boxShadow: '0 5px 15px rgba(106, 17, 203, 0.3)',
              '&:hover': {
                boxShadow: '0 5px 20px rgba(106, 17, 203, 0.5)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Инвестировать
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const MainPage = () => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('hero');
  const countdownRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleNavigateToCountdown = () => {
    countdownRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      title: 'NeuraTech: AI стартап',
      description: 'Разработка инновационного ИИ для интеграции в производственные процессы.',
      raised: 3750000,
      goal: 5000000
    },
    {
      image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0',
      title: 'EcoFarm: Умное фермерство',
      description: 'Автоматизированные фермы с использованием IoT технологий для устойчивого земледелия.',
      raised: 8500000,
      goal: 12000000
    },
    {
      image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf',
      title: 'FinLedger: Блокчейн-платформа',
      description: 'Децентрализованная финансовая платформа для бизнеса с интеграцией смарт-контрактов.',
      raised: 6300000,
      goal: 7500000
    }
  ];
  
  return (
    <Box 
      sx={{ 
        bgcolor: '#0A0A1F',
        color: 'white',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <HeroBanner onNavigateToCountdown={handleNavigateToCountdown} />
      
      {/* Features Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          backgroundImage: 'radial-gradient(circle at 20% 90%, rgba(106, 17, 203, 0.15) 0%, transparent 50%)'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: 'primary.main',
                  letterSpacing: 2, 
                  fontWeight: 'bold',
                  display: 'block',
                  mb: 1
                }}
              >
                ПРЕИМУЩЕСТВА ПЛАТФОРМЫ
              </Typography>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #DCDCDC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Почему Chihuahua Capital?
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  maxWidth: 700, 
                  mx: 'auto',
                  opacity: 0.7
                }}
              >
                Наша платформа сочетает в себе лучшие практики традиционных инвестиций и инновации блокчейн-технологий, создавая уникальную экосистему для инвесторов и предпринимателей.
              </Typography>
            </Box>
          </motion.div>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard 
                icon={<SecurityIcon />} 
                title="Безопасность"
                description="Все транзакции защищены блокчейн-технологией с полной прозрачностью движения средств. Смарт-контракты автоматически выполняют обязательства."
                delay={0.1}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard 
                icon={<TrendingUpIcon />} 
                title="Потенциальная доходность"
                description="Средняя доходность проектов на платформе составляет 18.5% годовых. Лучшие проекты показывают рост до 40% годовых."
                delay={0.2}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard 
                icon={<AccountBalanceWalletIcon />} 
                title="Низкий порог входа"
                description="Начните инвестировать от 15 000 рублей. Диверсифицируйте портфель между разными проектами с минимальными рисками."
                delay={0.3}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard 
                icon={<PeopleIcon />} 
                title="Сообщество"
                description="Станьте частью сообщества единомышленников. Участвуйте в голосованиях по развитию проектов и получайте бонусы за активность."
                delay={0.4}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard 
                icon={<VerifiedIcon />} 
                title="Юридическая прозрачность"
                description="Все проекты проходят тщательную юридическую проверку. Мы работаем только с легальными бизнесами, зарегистрированными в РФ."
                delay={0.5}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard 
                icon={<AutoGraphIcon />} 
                title="Ликвидность токенов"
                description="Встроенная биржа обеспечивает постоянную ликвидность ваших токенов. Продавайте активы в любой момент без сложных процедур."
                delay={0.6}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Crypto Chart Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          backgroundColor: alpha('#0f0f23', 0.7),
          position: 'relative',
          overflow: 'hidden',
        }}
        ref={countdownRef}
      >
        {/* Background elements */}
        <Box 
          sx={{ 
            position: 'absolute',
            width: '80%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(106, 17, 203, 0.1) 0%, transparent 50%)',
            zIndex: 0,
            top: 0,
            right: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: 'primary.main',
                    letterSpacing: 2, 
                    fontWeight: 'bold',
                    display: 'block',
                    mb: 1
                  }}
                >
                  ТОКЕН CHIHUAHUA
                </Typography>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 3,
                    background: 'linear-gradient(90deg, #FFFFFF 0%, #DCDCDC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Отсчет до запуска токена
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4,
                    opacity: 0.7
                  }}
                >
                  Токен Chihuahua (CHIH) – основная валюта нашей экосистемы. Используйте его для инвестирования в проекты, получения дивидендов и участия в управлении платформой.
                </Typography>
                
                <List sx={{ mb: 4 }}>
                  {[
                    'Ограниченная эмиссия в 100 000 000 токенов',
                    'Дефляционная модель с регулярным сжиганием',
                    'Обеспечен реальными активами платформы',
                    'Доступен для стейкинга с APY до 15%'
                  ].map((item, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
                
                <Button 
                  variant="contained"
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                    boxShadow: '0 10px 20px rgba(106, 17, 203, 0.3)',
                    '&:hover': {
                      boxShadow: '0 15px 30px rgba(106, 17, 203, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease',
                    borderRadius: '50px',
                  }}
                >
                  Подписаться на запуск
                </Button>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <ParallaxSection>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 4 },
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 4,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <CryptoChart />
                  </Paper>
                </motion.div>
              </ParallaxSection>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Projects Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          backgroundImage: 'radial-gradient(circle at 70% 10%, rgba(255, 5, 124, 0.1) 0%, transparent 50%)'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: 'primary.main',
                  letterSpacing: 2, 
                  fontWeight: 'bold',
                  display: 'block',
                  mb: 1
                }}
              >
                ИНВЕСТИЦИИ
              </Typography>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(90deg, #FFFFFF 0%, #DCDCDC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Перспективные проекты
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  maxWidth: 700, 
                  mx: 'auto',
                  opacity: 0.7
                }}
              >
                Инвестируйте в тщательно отобранные бизнес-проекты с потенциалом высокого роста. Каждый проект проходит многоступенчатую проверку нашей экспертной командой.
              </Typography>
            </Box>
          </motion.div>
          
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProjectCard {...project} index={index} />
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                fontWeight: 'bold',
                borderColor: 'rgba(255,255,255,0.3)',
                borderWidth: '2px',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                },
                borderRadius: '50px',
              }}
            >
              Показать все проекты
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Back to top button */}
      <Box 
        sx={{ 
          position: 'fixed',
          bottom: 40,
          right: 40,
          zIndex: 10
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              minWidth: 'auto',
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
              boxShadow: '0 10px 20px rgba(106, 17, 203, 0.3)',
              '&:hover': {
                boxShadow: '0 15px 30px rgba(106, 17, 203, 0.4)',
              },
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUpwardIcon />
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default MainPage; 