import { ethers } from 'ethers';
import { TokenInfo } from './tokenFactory';

// Interface for user token binding
export interface UserTokenBinding {
  address: string; // User's wallet address
  tokenAddresses: string[]; // List of owned token addresses
  favoriteTokens: string[]; // List of favorite token addresses
  lastInteraction: number; // Timestamp of last interaction
  tokenImages: Record<string, string>; // Map of token address to image URL
}

// Local storage key
const USER_TOKENS_KEY = 'chihuahua_user_tokens';

// Load user token bindings from localStorage
export const loadUserTokenBindings = (): UserTokenBinding[] => {
  try {
    const data = localStorage.getItem(USER_TOKENS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка при загрузке данных привязки токенов:', error);
    return [];
  }
};

// Save user token bindings to localStorage
export const saveUserTokenBindings = (bindings: UserTokenBinding[]): void => {
  try {
    localStorage.setItem(USER_TOKENS_KEY, JSON.stringify(bindings));
  } catch (error) {
    console.error('Ошибка при сохранении данных привязки токенов:', error);
  }
};

// Get tokens for a specific user
export const getUserTokens = (userAddress: string): UserTokenBinding | null => {
  if (!userAddress) return null;
  
  const bindings = loadUserTokenBindings();
  return bindings.find(binding => 
    binding.address.toLowerCase() === userAddress.toLowerCase()
  ) || null;
};

// Create or update user token binding
export const updateUserTokens = (
  userAddress: string, 
  tokenAddresses: string[] = [], 
  favoriteTokens: string[] = [],
  tokenImages: Record<string, string> = {}
): void => {
  if (!userAddress) return;
  
  const bindings = loadUserTokenBindings();
  const existingIndex = bindings.findIndex(
    binding => binding.address.toLowerCase() === userAddress.toLowerCase()
  );
  
  // If user exists, preserve existing token images
  let combinedTokenImages = tokenImages;
  if (existingIndex >= 0 && bindings[existingIndex].tokenImages) {
    combinedTokenImages = {
      ...bindings[existingIndex].tokenImages,
      ...tokenImages
    };
  }
  
  const updatedBinding: UserTokenBinding = {
    address: userAddress,
    tokenAddresses,
    favoriteTokens,
    tokenImages: combinedTokenImages,
    lastInteraction: Date.now()
  };
  
  if (existingIndex >= 0) {
    bindings[existingIndex] = updatedBinding;
  } else {
    bindings.push(updatedBinding);
  }
  
  saveUserTokenBindings(bindings);
};

// Add a token to the user's list
export const addUserToken = (userAddress: string, tokenAddress: string): void => {
  if (!userAddress || !tokenAddress) return;
  
  const userBinding = getUserTokens(userAddress);
  
  let tokenAddresses: string[] = [];
  let favoriteTokens: string[] = [];
  let tokenImages: Record<string, string> = {};
  
  if (userBinding) {
    tokenAddresses = [...userBinding.tokenAddresses];
    favoriteTokens = [...userBinding.favoriteTokens];
    tokenImages = userBinding.tokenImages || {};
  }
  
  if (!tokenAddresses.includes(tokenAddress)) {
    tokenAddresses.push(tokenAddress);
  }
  
  updateUserTokens(userAddress, tokenAddresses, favoriteTokens, tokenImages);
};

// Remove a token from the user's list
export const removeUserToken = (userAddress: string, tokenAddress: string): void => {
  if (!userAddress || !tokenAddress) return;
  
  const userBinding = getUserTokens(userAddress);
  if (!userBinding) return;
  
  const tokenAddresses = userBinding.tokenAddresses.filter(
    address => address.toLowerCase() !== tokenAddress.toLowerCase()
  );
  
  const favoriteTokens = userBinding.favoriteTokens.filter(
    address => address.toLowerCase() !== tokenAddress.toLowerCase()
  );
  
  // Remove image if exists
  const tokenImages = { ...userBinding.tokenImages };
  if (tokenImages[tokenAddress]) {
    delete tokenImages[tokenAddress];
  }
  
  updateUserTokens(userAddress, tokenAddresses, favoriteTokens, tokenImages);
};

// Toggle favorite status for a token
export const toggleFavoriteToken = (userAddress: string, tokenAddress: string): boolean => {
  if (!userAddress || !tokenAddress) return false;
  
  const userBinding = getUserTokens(userAddress);
  if (!userBinding) {
    // Create a new binding with this token as favorite
    updateUserTokens(userAddress, [tokenAddress], [tokenAddress], {});
    return true;
  }
  
  let favoriteTokens = [...userBinding.favoriteTokens];
  const isFavorite = favoriteTokens.some(
    address => address.toLowerCase() === tokenAddress.toLowerCase()
  );
  
  if (isFavorite) {
    // Remove from favorites
    favoriteTokens = favoriteTokens.filter(
      address => address.toLowerCase() !== tokenAddress.toLowerCase()
    );
  } else {
    // Add to favorites
    favoriteTokens.push(tokenAddress);
  }
  
  updateUserTokens(userAddress, userBinding.tokenAddresses, favoriteTokens, userBinding.tokenImages || {});
  return !isFavorite; // Return new status
};

// Check if a token is in user's favorites
export const isTokenFavorite = (userAddress: string, tokenAddress: string): boolean => {
  if (!userAddress || !tokenAddress) return false;
  
  const userBinding = getUserTokens(userAddress);
  if (!userBinding) return false;
  
  return userBinding.favoriteTokens.some(
    address => address.toLowerCase() === tokenAddress.toLowerCase()
  );
};

// Get all user's favorite tokens
export const getUserFavoriteTokens = (userAddress: string): string[] => {
  if (!userAddress) return [];
  
  const userBinding = getUserTokens(userAddress);
  if (!userBinding) return [];
  
  return userBinding.favoriteTokens;
};

// Set token image
export const setTokenImage = (userAddress: string, tokenAddress: string, imageUrl: string): void => {
  if (!userAddress || !tokenAddress || !imageUrl) return;
  
  const userBinding = getUserTokens(userAddress);
  if (!userBinding) {
    // Create a new user binding with this token image
    const tokenImages: Record<string, string> = {};
    tokenImages[tokenAddress] = imageUrl;
    updateUserTokens(userAddress, [tokenAddress], [], tokenImages);
    return;
  }
  
  const tokenImages = {
    ...userBinding.tokenImages || {},
    [tokenAddress]: imageUrl
  };
  
  updateUserTokens(
    userAddress, 
    userBinding.tokenAddresses, 
    userBinding.favoriteTokens, 
    tokenImages
  );
};

// Get token image
export const getTokenImage = (userAddress: string, tokenAddress: string): string | null => {
  if (!userAddress || !tokenAddress) return null;
  
  const userBinding = getUserTokens(userAddress);
  if (!userBinding || !userBinding.tokenImages) return null;
  
  return userBinding.tokenImages[tokenAddress] || null;
}; 