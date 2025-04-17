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

export enum ConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
} 