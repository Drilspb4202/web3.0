import { Project } from '../types';

const FAVORITES_STORAGE_KEY = 'chihuahua-capital-favorites';

/**
 * Сервис для управления избранными проектами
 */
export const FavoriteService = {
  /**
   * Получить список ID избранных проектов
   */
  getFavoriteIds(): number[] {
    try {
      const favorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Ошибка при получении избранных проектов:', error);
      return [];
    }
  },

  /**
   * Добавить проект в избранное
   */
  addFavorite(projectId: number): void {
    try {
      const favorites = this.getFavoriteIds();
      if (!favorites.includes(projectId)) {
        favorites.push(projectId);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Ошибка при добавлении проекта в избранное:', error);
    }
  },

  /**
   * Удалить проект из избранного
   */
  removeFavorite(projectId: number): void {
    try {
      const favorites = this.getFavoriteIds();
      const updatedFavorites = favorites.filter(id => id !== projectId);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Ошибка при удалении проекта из избранного:', error);
    }
  },

  /**
   * Проверить, является ли проект избранным
   */
  isFavorite(projectId: number): boolean {
    return this.getFavoriteIds().includes(projectId);
  },

  /**
   * Переключить статус избранного
   */
  toggleFavorite(projectId: number): boolean {
    if (this.isFavorite(projectId)) {
      this.removeFavorite(projectId);
      return false;
    } else {
      this.addFavorite(projectId);
      return true;
    }
  },

  /**
   * Обновить список проектов, добавив флаг isFavorite
   */
  markFavoriteProjects(projects: Project[]): Project[] {
    const favoriteIds = this.getFavoriteIds();
    return projects.map(project => ({
      ...project,
      isFavorite: favoriteIds.includes(project.id)
    }));
  }
};

export default FavoriteService; 