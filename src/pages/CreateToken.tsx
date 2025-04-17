import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  CircularProgress,
  Grid,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  InputAdornment,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { toast } from 'react-toastify';
import { Web3Context } from '../contexts/Web3Context';
import { createToken } from '../services/tokenFactory';

// Иконки
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TokenIcon from '@mui/icons-material/Token';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import BackupTableIcon from '@mui/icons-material/BackupTable';

const CreateToken: React.FC = () => {
  const { account } = useContext(Web3Context);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdTokenAddress, setCreatedTokenAddress] = useState<string | null>(null);
  
  // Функция проверки валидности формы
  const isFormValid = () => {
    return name.trim() !== '' && symbol.trim() !== '' && totalSupply.trim() !== '' && Number(totalSupply) > 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account) {
      setError('Пожалуйста, подключите ваш кошелек');
      return;
    }
    
    if (!name || !symbol || !totalSupply) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    if (isNaN(Number(totalSupply)) || Number(totalSupply) <= 0) {
      setError('Общее предложение должно быть положительным числом');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      const tokenAddress = await createToken(name, symbol, totalSupply);
      if (tokenAddress) {
        setCreatedTokenAddress(tokenAddress);
        toast.success('Токен успешно создан!', {
          icon: <EmojiEventsIcon style={{ color: '#2ECC71' }} />
        });
      } else {
        setError('Что-то пошло не так. Токен не был создан.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Произошла ошибка при создании токена');
      toast.error('Ошибка при создании токена');
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setName('');
    setSymbol('');
    setTotalSupply('');
    setCreatedTokenAddress(null);
    setError('');
  };
  
  const handleViewTokens = () => {
    navigate('/tokens');
  };
  
  const handleCopyAddress = () => {
    if (createdTokenAddress) {
      navigator.clipboard.writeText(createdTokenAddress);
      toast.info('Адрес токена скопирован', {
        autoClose: 2000
      });
    }
  };
  
  if (!account) {
    return (
      <Box className="fade-in" sx={{ my: 4 }}>
        <Card 
          elevation={3} 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Box sx={{ 
            height: '8px', 
            width: '100%', 
            background: 'var(--gradient-primary)'
          }} />
          
          <CardContent sx={{ p: 4 }}>
            <Typography 
              variant="h5" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <AccountBalanceWalletIcon sx={{ mr: 1, color: 'var(--primary-color)' }} />
              Требуется подключение
            </Typography>
            
            <Alert 
              severity="warning" 
              variant="outlined"
              sx={{ 
                mt: 2, 
                borderRadius: 'var(--radius-md)'
              }}
            >
              Пожалуйста, подключите ваш кошелек, чтобы создать токен.
            </Alert>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  px: 3,
                  py: 1,
                  fontWeight: 500,
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  textTransform: 'none',
                  '&:hover': {
                    boxShadow: 'var(--shadow-lg)',
                  }
                }}
                onClick={() => navigate('/')}
                startIcon={<ArrowBackIcon />}
              >
                Вернуться на главную
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
  
  return (
    <div className="fade-in">
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700, 
            color: 'var(--dark-color)', 
            mb: 1.5,
            display: 'inline-flex',
            alignItems: 'center',
            '&::after': {
              content: '""',
              display: 'block',
              width: '50px',
              height: '3px',
              background: 'var(--gradient-primary)',
              borderRadius: '10px',
              marginLeft: '16px'
            },
            '&::before': {
              content: '""',
              display: 'block',
              width: '50px',
              height: '3px',
              background: 'var(--gradient-primary)',
              borderRadius: '10px',
              marginRight: '16px'
            }
          }}
        >
          Создать новый токен
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 3, 
            color: 'text.secondary',
            maxWidth: '700px',
            mx: 'auto'
          }}
        >
          Заполните форму для выпуска собственного ERC20 токена на блокчейне Avalanche
        </Typography>
        
        <Stepper 
          activeStep={createdTokenAddress ? 1 : 0} 
          alternativeLabel
          sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            mb: 5,
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          <Step>
            <StepLabel>Заполните данные токена</StepLabel>
          </Step>
          <Step>
            <StepLabel>Получите созданный токен</StepLabel>
          </Step>
        </Stepper>
      </Box>
      
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 4 }, 
          maxWidth: 700, 
          mx: 'auto',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          transition: 'all var(--transition-normal)'
        }}
      >
        {createdTokenAddress ? (
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 4,
              animation: 'fadeIn 0.5s'
            }}>
              <TokenIcon 
                sx={{ 
                  fontSize: '80px', 
                  color: 'var(--success-color)',
                  filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.1))'
                }} 
              />
            </Box>
            
            <Alert 
              icon={<CheckCircleOutlineIcon fontSize="inherit" />}
              severity="success" 
              variant="filled"
              sx={{ 
                mb: 4, 
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Токен успешно создан!
              </Typography>
              <Typography variant="body2">
                Ваш токен был успешно выпущен и теперь доступен в блокчейне
              </Typography>
            </Alert>
            
            <Card 
              variant="outlined" 
              sx={{ 
                mb: 4, 
                p: 1, 
                borderRadius: 'var(--radius-md)',
                borderColor: 'rgba(0,0,0,0.1)',
                bgcolor: '#f9f9f9'
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Название токена
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {name}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Символ токена
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {symbol}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Общее предложение
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {Number(totalSupply).toLocaleString()} {symbol}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Владелец
                    </Typography>
                    <Chip 
                      label={`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        bgcolor: 'rgba(142, 68, 173, 0.1)',
                        color: 'var(--primary-color)'
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Адрес токена:
            </Typography>
            
            <Paper 
              variant="outlined"
              sx={{ 
                p: 2, 
                borderRadius: 'var(--radius-md)',
                mb: 4,
                backgroundColor: '#f8f9fa',
                borderColor: 'rgba(0,0,0,0.08)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  wordBreak: 'break-all',
                  fontFamily: 'monospace',
                  fontWeight: 500,
                  color: 'var(--dark-color)',
                  pl: 1
                }}
              >
                {createdTokenAddress}
              </Typography>
              <IconButton 
                size="small" 
                onClick={handleCopyAddress}
                sx={{ 
                  ml: 1, 
                  color: 'var(--primary-color)',
                  '&:hover': {
                    backgroundColor: 'rgba(142, 68, 173, 0.1)'
                  }
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                onClick={handleReset}
                sx={{
                  background: 'var(--gradient-primary)',
                  color: 'white',
                  fontWeight: 500,
                  px: 3,
                  py: 1.2,
                  borderRadius: 'var(--radius-md)',
                  textTransform: 'none',
                  boxShadow: 'var(--shadow-md)',
                  '&:hover': {
                    boxShadow: 'var(--shadow-lg)',
                    transform: 'translateY(-2px)'
                  }
                }}
                startIcon={<BackupTableIcon />}
              >
                Создать еще один токен
              </Button>
              
              <Button 
                variant="outlined" 
                onClick={handleViewTokens}
                sx={{
                  borderColor: 'var(--primary-color)',
                  color: 'var(--primary-color)',
                  fontWeight: 500,
                  px: 3,
                  py: 1.2,
                  borderRadius: 'var(--radius-md)',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'var(--primary-color)',
                    backgroundColor: 'rgba(142, 68, 173, 0.05)',
                    transform: 'translateY(-2px)'
                  }
                }}
                startIcon={<NextPlanIcon />}
              >
                Просмотреть все токены
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert 
                severity="error" 
                variant="filled"
                sx={{ 
                  mb: 4, 
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {error}
              </Alert>
            )}
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography 
                  variant="subtitle2" 
                  gutterBottom 
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Название токена*
                </Typography>
                <TextField
                  placeholder="Например: Chihuahua Business Token"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                  variant="outlined"
                  helperText="Полное название вашего токена, которое будет отображаться в кошельках и на биржах"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TokenIcon sx={{ color: 'var(--primary-color)', opacity: 0.7 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 'var(--radius-md)',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary-color)',
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography 
                  variant="subtitle2" 
                  gutterBottom 
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Символ токена*
                </Typography>
                <TextField
                  placeholder="Например: CBT"
                  fullWidth
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  disabled={loading}
                  required
                  variant="outlined"
                  helperText="Краткий символ токена (обычно 3-4 буквы), который будет использоваться для обозначения"
                  inputProps={{
                    style: { textTransform: 'uppercase' }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 'var(--radius-md)',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary-color)',
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography 
                  variant="subtitle2" 
                  gutterBottom 
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Общее предложение*
                </Typography>
                <TextField
                  placeholder="Например: 1000000"
                  fullWidth
                  type="number"
                  value={totalSupply}
                  onChange={(e) => setTotalSupply(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    inputProps: { min: 1 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip 
                          title="Общее количество токенов, которое будет создано. Все токены будут отправлены на ваш адрес."
                          arrow
                          placement="top"
                        >
                          <InfoOutlinedIcon fontSize="small" sx={{ color: 'var(--primary-color)', opacity: 0.7 }} />
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  required
                  variant="outlined"
                  helperText="Общее количество токенов, которое будет выпущено (целое положительное число)"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 'var(--radius-md)',
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary-color)',
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            <Box sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading || !isFormValid()}
                sx={{
                  background: isFormValid() ? 'var(--gradient-primary)' : undefined,
                  color: 'white',
                  minWidth: 200,
                  py: 1.5,
                  px: 4,
                  borderRadius: 'var(--radius-md)',
                  textTransform: 'none',
                  fontWeight: 600,
                  position: 'relative',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 'var(--shadow-lg)',
                    transform: 'translateY(-2px)'
                  },
                  '&:disabled': {
                    opacity: 0.7,
                    backgroundColor: '#A9A9A9'
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Создать токен'
                )}
              </Button>
              
              <Typography 
                variant="caption" 
                display="block" 
                sx={{ mt: 2, color: 'text.secondary' }}
              >
                После нажатия кнопки вам потребуется подтвердить транзакцию в кошельке
              </Typography>
            </Box>
          </form>
        )}
      </Paper>
    </div>
  );
};

export default CreateToken; 