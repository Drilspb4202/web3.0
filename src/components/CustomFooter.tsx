import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider, 
  IconButton, 
  useTheme,
  Stack,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  LinkedIn as LinkedInIcon,
  Telegram as TelegramIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CustomFooter: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/', label: 'Twitter' },
    { icon: <InstagramIcon />, url: 'https://instagram.com/', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: <TelegramIcon />, url: 'https://telegram.org/', label: 'Telegram' }
  ];
  
  const menuItems = {
    'Платформа': [
      { name: 'О нас', path: '/about' },
      { name: 'Как это работает', path: '/how-it-works' },
      { name: 'Тарифы', path: '/pricing' },
      { name: 'Партнёрам', path: '/partners' }
    ],
    'Инвесторам': [
      { name: 'Проекты', path: '/projects' },
      { name: 'Преимущества', path: '/benefits' },
      { name: 'Безопасность', path: '/security' },
      { name: 'Обучение', path: '/education' }
    ],
    'Бизнесу': [
      { name: 'Создать проект', path: '/create-project' },
      { name: 'Поддержка бизнеса', path: '/business-support' },
      { name: 'Истории успеха', path: '/success-stories' },
      { name: 'Консультация', path: '/consultation' }
    ],
    'Поддержка': [
      { name: 'Помощь', path: '/help' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Контакты', path: '/contacts' },
      { name: 'Блог', path: '/blog' }
    ]
  };
  
  const contactInfo = [
    { icon: <PhoneIcon />, text: '+7 (495) 123-45-67', link: 'tel:+74951234567' },
    { icon: <EmailIcon />, text: 'info@chihuahua-capital.ru', link: 'mailto:info@chihuahua-capital.ru' },
    { icon: <LocationIcon />, text: 'Москва, Пресненская наб., 12', link: 'https://maps.google.com' }
  ];
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : '#f8f9fa',
        color: theme.palette.text.primary,
        py: 8,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Логотип и текст */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Box component={RouterLink} to="/" sx={{ display: 'block', mb: 3, textDecoration: 'none' }}>
                <Typography 
                  variant="h4" 
                  component="div" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src="/images/logo.svg" 
                    alt="Chihuahua Capital" 
                    style={{ height: 40, marginRight: 12 }} 
                  />
                  Chihuahua Capital
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                Первая платформа для токенизации бизнеса в России. 
                Мы помогаем инвесторам находить перспективные проекты, 
                а предпринимателям привлекать финансирование.
              </Typography>
              
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                {socialLinks.map((link, index) => (
                  <IconButton 
                    key={index}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    sx={{ 
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        transform: 'translateY(-3px)',
                      },
                      transition: 'transform 0.2s'
                    }}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Stack>
            </motion.div>
          </Grid>
          
          {/* Меню сайта */}
          {Object.entries(menuItems).map(([category, items], index) => (
            <Grid item xs={6} sm={3} md={2} key={category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="subtitle1" 
                  component="h6" 
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  {category}
                </Typography>
                <Stack spacing={1}>
                  {items.map((item) => (
                    <Link 
                      key={item.name}
                      component={RouterLink}
                      to={item.path}
                      sx={{ 
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          textDecoration: 'none'
                        },
                        transition: 'color 0.2s',
                        fontSize: '0.95rem'
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </Stack>
              </motion.div>
            </Grid>
          ))}
          
          {/* Контактная информация и форма подписки */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Typography 
                variant="subtitle1" 
                component="h6" 
                sx={{ fontWeight: 'bold', mb: 2 }}
              >
                Оставайтесь с нами на связи
              </Typography>
              
              <Stack spacing={2}>
                {contactInfo.map((info, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      sx={{ 
                        mr: 1.5,
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Link 
                      href={info.link}
                      sx={{ 
                        color: 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          textDecoration: 'none'
                        }
                      }}
                    >
                      {info.text}
                    </Link>
                  </Box>
                ))}
              </Stack>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Подпишитесь на новости:
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Ваш email"
                  variant="outlined"
                  size="small"
                  sx={{ 
                    mt: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: theme.palette.background.paper
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          aria-label="send email subscription"
                          sx={{ 
                            minWidth: 'unset',
                            borderRadius: 1,
                            p: 1,
                            color: 'white',
                            bgcolor: theme.palette.primary.main,
                            '&:hover': {
                              bgcolor: theme.palette.primary.dark
                            }
                          }}
                        >
                          <SendIcon fontSize="small" />
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 6 }} />
        
        {/* Нижняя часть футера */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Chihuahua Capital. Все права защищены.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={{ xs: 1, sm: 3 }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            <Link 
              component={RouterLink} 
              to="/terms"
              sx={{ 
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: theme.palette.primary.main }
              }}
            >
              Условия использования
            </Link>
            <Link 
              component={RouterLink} 
              to="/privacy"
              sx={{ 
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: theme.palette.primary.main }
              }}
            >
              Политика конфиденциальности
            </Link>
            <Link 
              component={RouterLink} 
              to="/cookies"
              sx={{ 
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': { color: theme.palette.primary.main }
              }}
            >
              Cookies
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default CustomFooter; 