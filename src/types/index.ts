/**
 * Common types used throughout the application
 */

export interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  creator: string;
  createdAt: string;
  totalSupply: string;
  description?: string;
  verified?: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  logo: string;
  raised?: number;
  goal?: number;
  tokenPrice?: number;
  currency?: string;
  category: string;
  status?: string;
  isFavorite?: boolean;
}

export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: number;
  projectId?: number;
} 