import React, { useContext, useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Button, 
  Divider, 
  Tabs, 
  Tab, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Chip,
  TextField,
  Card,
  CardContent
} from '@mui/material';
import { Web3Context } from '../contexts/Web3Context';
import { motion } from 'framer-motion';
import TokenIcon from '@mui/icons-material/Token';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Profile: React.FC = () => {
  const { account, connectWallet } = useContext(Web3Context);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!account) {
    return (
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: 8, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3
            }}
          >
            <Avatar 
              sx={{ 
                width: 100, 
                height: 100, 
                bgcolor: 'var(--primary-light)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom color="var(--primary-color)">
              Требуется подключение кошелька
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, maxWidth: 450 }} color="text.secondary">
              Для доступа к личному кабинету необходимо подключить кошелёк MetaMask к сети Avalanche Fuji.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                background: 'var(--gradient-primary)',
                px: 4,
                py: 1.2,
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                fontWeight: 'bold',
                '&:hover': {
                  boxShadow: 'var(--shadow-lg)',
                  transform: 'translateY(-2px)'
                }
              }}
              onClick={connectWallet}
              startIcon={<AccountBalanceWalletIcon />}
            >
              Подключить кошелёк (MetaMask/Fuji)
            </Button>
          </Box>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            background: 'var(--gradient-primary)',
            color: 'white'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={2} sx={{ 
              display: 'flex', 
              justifyContent: { xs: 'center', md: 'flex-start' },
              mb: { xs: 2, md: 0 }
            }}>
              <Avatar 
                sx={{ 
                  width: 100, 
                  height: 100,
                  boxShadow: '0 0 20px rgba(255,255,255,0.3)'
                }}
                src="https://i.pravatar.cc/300" 
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: { xs: 'center', md: 'left' } }}>
                Инвестор Chihuahua
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 1, textAlign: { xs: 'center', md: 'left' } }}>
                {account}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Chip 
                  label="Активный инвестор" 
                  size="small" 
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
                />
                <Chip 
                  label="3 проекта" 
                  size="small" 
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 2
            }}>
              <Button 
                variant="contained" 
                color="inherit"
                sx={{ color: 'var(--primary-color)', fontWeight: 'bold' }}
                startIcon={<SettingsIcon />}
              >
                Настройки
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <List component="nav">
                <ListItem button selected={tabValue === 0} onClick={() => setTabValue(0)}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Баланс и активы" />
                </ListItem>
                
                <ListItem button selected={tabValue === 1} onClick={() => setTabValue(1)}>
                  <ListItemIcon>
                    <TokenIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Мои инвестиции" />
                </ListItem>
                
                <ListItem button selected={tabValue === 2} onClick={() => setTabValue(2)}>
                  <ListItemIcon>
                    <HistoryIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="История транзакций" />
                </ListItem>
                
                <Divider sx={{ my: 2 }} />
                
                <ListItem button selected={tabValue === 3} onClick={() => setTabValue(3)}>
                  <ListItemIcon>
                    <SettingsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Настройки" />
                </ListItem>
                
                <ListItem button selected={tabValue === 4} onClick={() => setTabValue(4)}>
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Безопасность" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                  <Tab label="Баланс и активы" id="profile-tab-0" />
                  <Tab label="Мои инвестиции" id="profile-tab-1" />
                  <Tab label="История" id="profile-tab-2" />
                  <Tab label="Настройки" id="profile-tab-3" />
                  <Tab label="Безопасность" id="profile-tab-4" />
                </Tabs>
              </Box>
              
              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'var(--primary-color)', mb: 3 }}>
                  Баланс и активы
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-sm)',
                        height: '100%'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <MonetizationOnIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Баланс AVAX
                          </Typography>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--primary-color)', mb: 1 }}>
                          125.45 AVAX
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ≈ $1,245.50 USD
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                          <Button 
                            variant="contained" 
                            sx={{ background: 'var(--gradient-primary)', flex: 1 }}
                          >
                            Пополнить
                          </Button>
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            sx={{ flex: 1 }}
                          >
                            Вывести
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-sm)',
                        height: '100%'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <TokenIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Токены проектов
                          </Typography>
                        </Box>
                        
                        <List dense>
                          <ListItem>
                            <ListItemText 
                              primary="CoffeeShop Token (CST)"
                              secondary="28,500 CST"
                            />
                            <Typography variant="body2" color="text.secondary">
                              $285.00
                            </Typography>
                          </ListItem>
                          <Divider sx={{ my: 1 }} />
                          <ListItem>
                            <ListItemText 
                              primary="Bike Rental Token (BRT)"
                              secondary="15,750 BRT"
                            />
                            <Typography variant="body2" color="text.secondary">
                              $157.50
                            </Typography>
                          </ListItem>
                          <Divider sx={{ my: 1 }} />
                          <ListItem>
                            <ListItemText 
                              primary="Tech Startup Token (TST)"
                              secondary="42,000 TST"
                            />
                            <Typography variant="body2" color="text.secondary">
                              $420.00
                            </Typography>
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </TabPanel>
              
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'var(--primary-color)', mb: 3 }}>
                  Мои инвестиции
                </Typography>
                
                <Box>
                  <Typography variant="body1">
                    Здесь будет отображаться информация о ваших инвестициях в проекты.
                  </Typography>
                </Box>
              </TabPanel>
              
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'var(--primary-color)', mb: 3 }}>
                  История транзакций
                </Typography>
                
                <Box>
                  <Typography variant="body1">
                    Здесь будет отображаться история ваших транзакций.
                  </Typography>
                </Box>
              </TabPanel>
              
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'var(--primary-color)', mb: 3 }}>
                  Настройки профиля
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Отображаемое имя"
                      variant="outlined"
                      defaultValue="Инвестор Chihuahua"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      defaultValue="investor@example.com"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Описание"
                      variant="outlined"
                      multiline
                      rows={4}
                      defaultValue="Активный инвестор на платформе Chihuahua Capital, интересуюсь проектами в сфере DeFi и Web3."
                      margin="normal"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button variant="contained" sx={{ background: 'var(--gradient-primary)' }}>
                        Сохранить изменения
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              
              <TabPanel value={tabValue} index={4}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'var(--primary-color)', mb: 3 }}>
                  Настройки безопасности
                </Typography>
                
                <Box>
                  <Typography variant="body1">
                    Здесь будут настройки безопасности вашего аккаунта.
                  </Typography>
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Profile; 