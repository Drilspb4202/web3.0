/**
 * Типы для глобального состояния приложения Redux
 */

// Типы для пользовательских данных
export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  balance?: number;
  createdAt?: string;
  [key: string]: any;
}

// Состояние для slice пользователя
export interface UserState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
}

// Корневое состояние приложения (будет расширяться)
export interface RootState {
  user: UserState;
  // В будущем добавятся другие слайсы:
  // projects: ProjectsState;
  // notifications: NotificationsState;
  // и т.д.
  [key: string]: any;
}

// Тип для dispatch (заглушка)
// В реальном приложении нужно правильно типизировать через store
// import type { store } from '../store'
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = any; // Временная заглушка 