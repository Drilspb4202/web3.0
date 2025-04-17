/**
 * Utility functions for the Chihuahua Capital app
 */

/**
 * Shortens an Ethereum address to a more readable format
 * @param address The full Ethereum address
 * @param prefixLength Number of characters to show at beginning
 * @param suffixLength Number of characters to show at end
 * @returns Shortened address with ellipsis in the middle
 */
export const shortenAddress = (address: string, prefixLength = 6, suffixLength = 4): string => {
  if (!address) return '';
  if (address.length < prefixLength + suffixLength) return address;
  
  return `${address.substring(0, prefixLength)}...${address.substring(address.length - suffixLength)}`;
};

/**
 * Format a number with commas as thousands separators
 * @param num The number to format
 * @returns The formatted number as a string
 */
export const formatNumber = (num: number): string => {
  if (num === undefined || num === null) return '0';
  
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  }).format(num);
};

/**
 * Format a date to a human-readable string
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format amount with currency symbol
 * @param amount The amount to format
 * @returns Formatted amount with currency symbol
 */
export const formatAmount = (amount: number): string => {
  if (amount === undefined || amount === null) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Calculate percentage change between two values
 * @param current Current value
 * @param previous Previous value
 * @returns Percentage change as a number
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Format a percentage with + or - sign and % symbol
 * @param percent The percentage value
 * @returns Formatted percentage string
 */
export const formatPercentage = (percent: number): string => {
  if (percent === undefined || percent === null) return '0%';
  
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(percent)}%`;
};

/**
 * Wait for a specified amount of time
 * @param ms Milliseconds to wait
 * @returns Promise that resolves after the specified time
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Check if a string is a valid Ethereum address
 * @param address The address to validate
 * @returns Boolean indicating if the address is valid
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}; 