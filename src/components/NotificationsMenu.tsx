import React, { useState, useEffect } from 'react';
import { 
  Badge, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Divider, 
  Box, 
  Button,
  ListItemIcon,
  ListItemText,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  alpha,
  useTheme
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../types';
import NotificationService from '../services/notificationService';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Компонент меню уведомлений
 */
const NotificationsMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Загружаем уведомления при монтировании компонента
  useEffect(() => {
    loadNotifications();
  }, []);
  
  // Загрузка уведомлений из сервиса
  const loadNotifications = () => {
    const loadedNotifications = NotificationService.getNotifications();
    setNotifications(loadedNotifications);
    setUnreadCount(NotificationService.getUnreadCount());
  };
  
  // Обработчик открытия меню
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  // Обработчик закрытия меню
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Отметить уведомление как прочитанное
  const handleMarkAsRead = (id: string) => {
    NotificationService.markAsRead(id);
    loadNotifications();
  };
  
  // Отметить все уведомления как прочитанные
  const handleMarkAllAsRead = () => {
    NotificationService.markAllAsRead();
    loadNotifications();
  };
  
  // Удалить уведомление
  const handleDeleteNotification = (id: string) => {
    NotificationService.deleteNotification(id);
    loadNotifications();
  };
  
  // Очистить все уведомления
  const handleClearAll = () => {
    NotificationService.clearAll();
    loadNotifications();
    handleMenuClose();
  };
  
  // Переход к проекту
  const handleNavigateToProject = (projectId?: number) => {
    if (projectId) {
      navigate(`/tokens/${projectId}`);
      handleMenuClose();
    }
  };
  
  // Получить иконку в зависимости от типа уведомления
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'info':
      default:
        return <InfoIcon color="info" />;
    }
  };
  
  // Форматирование даты
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <>
      <Tooltip title="Уведомления">
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Badge badgeContent={unreadCount} color="error">
            {unreadCount > 0 ? 
              <NotificationsActiveIcon /> : 
              <NotificationsIcon />
            }
          </Badge>
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 320,
            maxHeight: 400,
            overflow: 'auto',
            mt: 1.5,
            borderRadius: 2,
            border: `1px solid ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : alpha('#000', 0.05)}`
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Уведомления
          </Typography>
        </Box>
        
        <Divider />
        
        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              У вас нет уведомлений
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ p: 0 }}>
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ListItem 
                      disablePadding 
                      sx={{ 
                        bgcolor: notification.read ? 'transparent' : alpha(theme.palette.primary.main, 0.05)
                      }}
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          size="small"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemButton 
                        onClick={() => {
                          if (!notification.read) {
                            handleMarkAsRead(notification.id);
                          }
                          handleNavigateToProject(notification.projectId);
                        }}
                        dense
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {getNotificationIcon(notification.type)}
                        </ListItemIcon>
                        <ListItemText 
                          primary={notification.title}
                          secondary={
                            <>
                              <Typography 
                                variant="body2" 
                                component="span" 
                                sx={{ 
                                  display: 'block',
                                  fontSize: '0.75rem',
                                  color: theme.palette.text.secondary
                                }}
                              >
                                {notification.message}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                component="span" 
                                sx={{ color: theme.palette.text.disabled }}
                              >
                                {formatDate(notification.timestamp)}
                              </Typography>
                            </>
                          }
                          primaryTypographyProps={{
                            variant: 'body2',
                            fontWeight: notification.read ? 'normal' : 'bold'
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
            
            <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                size="small" 
                startIcon={<DoneAllIcon />}
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                Прочитать все
              </Button>
              <Button 
                size="small" 
                color="error" 
                startIcon={<DeleteIcon />}
                onClick={handleClearAll}
              >
                Очистить все
              </Button>
            </Box>
          </>
        )}
      </Menu>
    </>
  );
};

export default NotificationsMenu; 