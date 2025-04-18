import { Notification } from '../types';
import { v4 as uuidv4 } from 'uuid';

const NOTIFICATIONS_STORAGE_KEY = 'chihuahua-capital-notifications';

/**
 * Сервис для управления уведомлениями
 */
export const NotificationService = {
  /**
   * Получить все уведомления
   */
  getNotifications(): Notification[] {
    try {
      const notifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
      console.error('Ошибка при получении уведомлений:', error);
      return [];
    }
  },

  /**
   * Добавить новое уведомление
   */
  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification {
    try {
      const notifications = this.getNotifications();
      const newNotification: Notification = {
        id: uuidv4(),
        timestamp: Date.now(),
        read: false,
        ...notification
      };
      
      const updatedNotifications = [newNotification, ...notifications];
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
      
      return newNotification;
    } catch (error) {
      console.error('Ошибка при добавлении уведомления:', error);
      throw error;
    }
  },

  /**
   * Отметить уведомление как прочитанное
   */
  markAsRead(notificationId: string): void {
    try {
      const notifications = this.getNotifications();
      const updatedNotifications = notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      );
      
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Ошибка при обновлении статуса уведомления:', error);
    }
  },

  /**
   * Отметить все уведомления как прочитанные
   */
  markAllAsRead(): void {
    try {
      const notifications = this.getNotifications();
      const updatedNotifications = notifications.map(notification => ({ 
        ...notification, 
        read: true 
      }));
      
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Ошибка при обновлении статуса всех уведомлений:', error);
    }
  },

  /**
   * Удалить уведомление
   */
  deleteNotification(notificationId: string): void {
    try {
      const notifications = this.getNotifications();
      const updatedNotifications = notifications.filter(
        notification => notification.id !== notificationId
      );
      
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Ошибка при удалении уведомления:', error);
    }
  },

  /**
   * Удалить все уведомления
   */
  clearAll(): void {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('Ошибка при очистке уведомлений:', error);
    }
  },

  /**
   * Получить количество непрочитанных уведомлений
   */
  getUnreadCount(): number {
    try {
      return this.getNotifications().filter(notification => !notification.read).length;
    } catch (error) {
      console.error('Ошибка при подсчете непрочитанных уведомлений:', error);
      return 0;
    }
  }
};

export default NotificationService; 