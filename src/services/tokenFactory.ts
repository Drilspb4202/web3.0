import { ethers } from 'ethers';
import TokenFactoryArtifact from '../artifacts/contracts/TokenFactory.sol/TokenFactory.json';

// Адрес контракта TokenFactory
// Для локальной разработки используем null, контракт будет деплоиться автоматически
let TOKEN_FACTORY_ADDRESS: string | null = null;

export const setTokenFactoryAddress = (address: string) => {
  TOKEN_FACTORY_ADDRESS = address;
};

export interface TokenInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  creator: string;
  timestamp: number;
  totalSupply: number;
  verified?: boolean;
  imageUrl?: string; // URL to the token image
}

export const getProvider = (): ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | null => {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  
  // Для локальной разработки с Hardhat Node
  try {
    return new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
  } catch (error) {
    console.error('Ошибка при подключении к локальному провайдеру:', error);
    return null;
  }
};

export const getTokenFactorySigner = async (): Promise<ethers.Contract | null> => {
  const provider = getProvider();
  if (!provider) return null;

  try {
    const signer = provider instanceof ethers.providers.Web3Provider 
      ? provider.getSigner() 
      : (await provider.listAccounts())[0];
    
    // Если адрес не задан, деплоим новый контракт (для локальной разработки)
    if (!TOKEN_FACTORY_ADDRESS) {
      const factory = new ethers.ContractFactory(
        TokenFactoryArtifact.abi, 
        TokenFactoryArtifact.bytecode, 
        provider instanceof ethers.providers.Web3Provider 
          ? provider.getSigner() 
          : provider.getSigner((await provider.listAccounts())[0])
      );
      const contract = await factory.deploy();
      await contract.deployed();
      TOKEN_FACTORY_ADDRESS = contract.address;
      console.log('TokenFactory deployed to:', TOKEN_FACTORY_ADDRESS);
    }
    
    return new ethers.Contract(
      TOKEN_FACTORY_ADDRESS, 
      TokenFactoryArtifact.abi, 
      provider instanceof ethers.providers.Web3Provider 
        ? provider.getSigner() 
        : provider.getSigner((await provider.listAccounts())[0])
    );
  } catch (error) {
    console.error('Ошибка при получении контракта токен-фабрики:', error);
    return null;
  }
};

export const createToken = async (
  name: string,
  symbol: string,
  totalSupply: string
): Promise<string | null> => {
  const contract = await getTokenFactorySigner();
  if (!contract) return null;

  try {
    const tx = await contract.createToken(name, symbol, totalSupply);
    const receipt = await tx.wait();
    
    // Получаем адрес созданного токена из события
    const event = receipt.events.find((e: any) => e.event === 'TokenCreated');
    if (event && event.args) {
      return event.args.tokenAddress;
    }
    return null;
  } catch (error) {
    console.error('Ошибка при создании токена:', error);
    throw error;
  }
};

export const getDeployedTokens = async (): Promise<string[]> => {
  const contract = await getTokenFactorySigner();
  if (!contract) return [];

  try {
    return await contract.getDeployedTokens();
  } catch (error) {
    console.error('Ошибка при получении списка токенов:', error);
    return [];
  }
};

export const getTokensCount = async (): Promise<number> => {
  const contract = await getTokenFactorySigner();
  if (!contract) return 0;

  try {
    const count = await contract.getDeployedTokensCount();
    return count.toNumber();
  } catch (error) {
    console.error('Ошибка при получении количества токенов:', error);
    return 0;
  }
};

export const getTokensInfo = async (): Promise<TokenInfo[]> => {
  // В реальном приложении здесь был бы запрос в смарт-контракт
  // Сейчас возвращаем моковые данные
  const mockTokens: TokenInfo[] = [
    {
      tokenAddress: "0x1234567890123456789012345678901234567890",
      name: "Coffee Shop Token",
      symbol: "CAFE",
      creator: "0xabcdef1234567890abcdef1234567890abcdef12",
      timestamp: Date.now() - 86400000 * 30, // 30 дней назад
      totalSupply: 100000,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      tokenAddress: "0x2345678901234567890123456789012345678901",
      name: "BookStore Token",
      symbol: "BOOK",
      creator: "0xfedcba0987654321fedcba0987654321fedcba09",
      timestamp: Date.now() - 86400000 * 15, // 15 дней назад
      totalSupply: 50000,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      tokenAddress: "0x3456789012345678901234567890123456789012",
      name: "Bakery Token",
      symbol: "CAKE",
      creator: "0xabcdef1234567890abcdef1234567890abcdefab",
      timestamp: Date.now() - 86400000 * 7, // 7 дней назад
      totalSupply: 75000,
      verified: false,
      imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];
  
  return mockTokens;
}; 