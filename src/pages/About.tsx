import React from 'react';
import { Box, Container, Typography, Stack, Button, useTheme } from '@mui/material';
import TeamGrid from '../components/TeamGrid';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Box component="main">
      {/* Hero секция */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 10, md: 15 },
          pb: { xs: 8, md: 10 },
          background: 'linear-gradient(180deg, rgba(5,5,15,1) 0%, rgba(10,10,20,1) 100%)',
          overflow: 'hidden'
        }}
      >
        {/* Декоративный фоновый элемент */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(106,17,203,0.05) 0%, rgba(0,0,0,0) 70%)',
            zIndex: 0
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="overline"
              component="div"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 2
              }}
            >
              О НАС
            </Typography>
            
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 3,
                background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Создаем будущее DeFi
            </Typography>
            
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                mb: 5
              }}
            >
              Chihuahua Capital — это DeFi-платформа нового поколения, созданная для демократизации финансовых инструментов 
              и предоставления равного доступа к инвестиционным возможностям для всех.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box
              sx={{
                height: { xs: '300px', md: '400px' },
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                background: 'url(https://source.unsplash.com/random/1200x600/?blockchain,finance) center/cover no-repeat',
                mx: 'auto'
              }}
            />
          </motion.div>
        </Container>
      </Box>

      {/* Наша миссия */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, rgba(10,10,20,1) 0%, rgba(5,5,15,1) 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 6, md: 10 }}
            alignItems="center"
          >
            <Box sx={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="overline"
                  component="div"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  НАША МИССИЯ
                </Typography>
                
                <Typography 
                  variant="h3" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 3
                  }}
                >
                  Democratizing DeFi
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mb: 4 }}
                >
                  Мы стремимся сделать DeFi доступным для каждого, независимо от уровня технических знаний или размера капитала. 
                  Наша цель — создать экосистему, где любой человек может получить доступ к передовым финансовым инструментам, 
                  которые ранее были доступны только для профессиональных участников рынка.
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mb: 4 }}
                >
                  Мы верим в будущее, где финансовые возможности распределяются равномерно, где каждый имеет доступ к инструментам 
                  создания благосостояния, и где технологии работают для людей, а не против них.
                </Typography>
                
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{
                    backgroundImage: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                    px: 4,
                    py: 1.5
                  }}
                >
                  Узнать больше
                </Button>
              </motion.div>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    height: { xs: '300px', md: '400px' },
                    width: '100%',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    position: 'relative'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'url(https://source.unsplash.com/random/600x800/?blockchain,technology) center/cover no-repeat',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(106,17,203,0.4) 0%, rgba(37,117,252,0.4) 100%)',
                    }}
                  />
                </Box>
              </motion.div>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Команда */}
      <TeamGrid />

      {/* История компании */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, rgba(15,15,25,1) 0%, rgba(5,5,15,1) 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              component="span"
              variant="overline"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                letterSpacing: 1.5,
                mb: 2,
                display: 'block'
              }}
            >
              НАША ИСТОРИЯ
            </Typography>
            
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Путь инноваций и прогресса
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: { xs: '20px', md: '50%' },
                transform: { md: 'translateX(-50%)' },
                width: '2px',
                background: 'linear-gradient(180deg, rgba(106,17,203,0.3) 0%, rgba(37,117,252,0.3) 100%)'
              }
            }}
          >
            {[
              {
                year: '2020',
                title: 'Рождение идеи',
                description: 'Основатели проекта сформировали концепцию платформы Chihuahua Capital после наблюдения за ограничениями существующих DeFi решений'
              },
              {
                year: '2021',
                title: 'Формирование команды',
                description: 'Мы собрали команду экспертов в области блокчейна, финансов и продуктового дизайна для разработки первого прототипа'
              },
              {
                year: '2022',
                title: 'Первые инвестиции',
                description: 'Проект привлек $5 миллионов инвестиций от ведущих венчурных фондов, специализирующихся на блокчейн-технологиях'
              },
              {
                year: '2023',
                title: 'Запуск бета-версии',
                description: 'Запуск бета-версии платформы с ограниченным набором функций для сбора обратной связи от первых пользователей'
              },
              {
                year: '2024',
                title: 'Полный запуск',
                description: 'Запуск полной версии платформы с расширенным набором функций и интеграциями с основными блокчейн-сетями'
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                    mb: 6,
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '80px', md: '50%' },
                      pr: { xs: 2, md: index % 2 === 0 ? 4 : 0 },
                      pl: { md: index % 2 === 0 ? 0 : 4 },
                      textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' }
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 'bold',
                        color: theme.palette.primary.main
                      }}
                    >
                      {event.year}
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      position: 'absolute',
                      left: '50%',
                      top: '15px',
                      transform: 'translateX(-50%)',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      bgcolor: 'background.paper',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: 'linear-gradient(90deg, #6a11cb, #2575fc)'
                      }}
                    />
                  </Box>
                  
                  <Box
                    sx={{
                      display: { xs: 'flex', md: 'none' },
                      position: 'absolute',
                      left: '20px',
                      top: '15px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      bgcolor: 'background.paper',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'linear-gradient(90deg, #6a11cb, #2575fc)'
                      }}
                    />
                  </Box>
                  
                  <Box
                    sx={{
                      width: { xs: 'calc(100% - 80px)', md: '50%' },
                      pl: { xs: 2, md: 0 }
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, fontWeight: 'bold' }}
                    >
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {event.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 