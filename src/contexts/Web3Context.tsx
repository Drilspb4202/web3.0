import React, { createContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getTokenFactorySigner } from '../services/tokenFactory';
import { toast } from 'react-toastify';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TokenFactoryABI from '../abis/TokenFactory.json';
import getChihuahuaABI from '../utils/getChihuahuaABI';
import { ConnectionStatus } from '../types';

// Интерфейс для сетевой статистики
interface NetworkStats {
  blockNumber: number | null;
  gasPrice: string | null;
  txCount: number | null;
  lastBlockTime: number | null;
  avgBlockTime: number | null;
}

// Интерфейс контекста с расширенной функциональностью
interface Web3ContextType {
  provider: ethers.providers.Web3Provider | null;
  account: string | null;
  isLocalNode: boolean;
  isLoading: boolean;
  balance: string | null;
  networkName: string | null;
  chainId: string | null;
  error: string | null;
  darkMode: boolean;
  networkStats: NetworkStats;
  connectionStatus: ConnectionStatus;
  toggleDarkMode: () => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: (networkId: string) => Promise<void>;
  refreshBalance: () => Promise<void>;
  refreshNetworkStats: () => Promise<void>;
  createToken: (name: string, symbol: string, supply: string, description: string) => Promise<string>;
  getTokenFactoryContract: () => ethers.Contract | null;
  fetchTokens: () => Promise<any[]>;
  isCorrectNetwork: boolean;
  switchToAvalanche: () => Promise<void>;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  account: null,
  isLocalNode: false,
  isLoading: true,
  balance: null,
  networkName: null,
  chainId: null,
  error: null,
  darkMode: false,
  networkStats: {
    blockNumber: null,
    gasPrice: null,
    txCount: null,
    lastBlockTime: null,
    avgBlockTime: null,
  },
  connectionStatus: ConnectionStatus.DISCONNECTED,
  toggleDarkMode: () => {},
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchNetwork: async () => {},
  refreshBalance: async () => {},
  refreshNetworkStats: async () => {},
  createToken: async () => '',
  getTokenFactoryContract: () => null,
  fetchTokens: async () => [],
  isCorrectNetwork: false,
  switchToAvalanche: async () => {},
});

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isLocalNode, setIsLocalNode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [networkName, setNetworkName] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem('darkMode') === 'true');
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    blockNumber: null,
    gasPrice: null,
    txCount: null,
    lastBlockTime: null,
    avgBlockTime: null,
  });
  const [blockTimes, setBlockTimes] = useState<number[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);

  // Добавляем таймаут для автоматического завершения загрузки
  const ensureLoadingFinishes = () => {
    // Таймер, который гарантирует завершение загрузки через 5 секунд
    setTimeout(() => {
      if (isLoading) {
        console.log('Загрузка принудительно завершена по таймауту');
        setIsLoading(false);
        setIsLocalNode(true); // Предполагаем, что это локальная нода
        setNetworkName('Локальная нода (режим просмотра)');
        setChainId('0x539');
      }
    }, 5000);
  };

  // Проверка подключения к Metamask или локальной ноде при загрузке
  useEffect(() => {
    // Запускаем таймер для предотвращения бесконечной загрузки
    ensureLoadingFinishes();
    
    // Стандартные операции проверки подключения
    checkConnection();
    initContract();
    
    // Применение темной/светлой темы
    applyTheme();
  }, []);
  
  // Применение выбранной темы
  const applyTheme = () => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  };
  
  // Переключение темы
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  // Применение темы при ее изменении
  useEffect(() => {
    applyTheme();
  }, [darkMode]);

  // Слушатель событий смены аккаунта и сети в Metamask
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);
  
  // Получение баланса аккаунта при его изменении
  useEffect(() => {
    if (account) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [account, chainId]);
  
  // Получение сетевой статистики при подключении или смене сети
  useEffect(() => {
    if (window.ethereum || isLocalNode) {
      fetchNetworkStats();
      
      // Обновление статистики каждые 15 секунд
      const interval = setInterval(() => {
        fetchNetworkStats();
      }, 15000);
      
      return () => clearInterval(interval);
    }
  }, [chainId, account]);

  const initContract = async () => {
    try {
      // Это автоматически деплоит контракт, если его нет
      await getTokenFactorySigner();
    } catch (error) {
      console.error('Ошибка при инициализации контракта:', error);
      setError('Не удалось инициализировать контракт. Приложение работает в режиме просмотра.');
      
      // Установим режим "просмотр", даже если инициализация контракта не удалась
      setIsLocalNode(true);
      setNetworkName('Режим просмотра');
    } finally {
      // Всегда завершаем загрузку, независимо от результата
      setIsLoading(false);
    }
  };

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      // Проверяем Metamask
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            
            // Получаем текущую сеть
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setChainId(chainId);
            const network = getNetworkName(chainId);
            setNetworkName(network);
            setIsLocalNode(chainId === '0x539' || chainId === '1337'); // Hardhat или Ganache
            setConnectionStatus(ConnectionStatus.CONNECTED);
            setIsCorrectNetwork(true);
            
            // Отображаем уведомление о подключении
            toast.success(`Подключено к ${network}`, {
              icon: <CheckCircleIcon style={{ color: '#2ECC71' }} />,
              autoClose: 3000
            });
          } else {
            // Если нет подключенных аккаунтов, не блокируем загрузку
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
            fallbackToReadOnlyMode();
          }
        } catch (metamaskError) {
          console.error('Ошибка при работе с MetaMask:', metamaskError);
          fallbackToReadOnlyMode();
        }
      } else {
        // Нет MetaMask, используем режим для чтения
        fallbackToReadOnlyMode();
      }
    } catch (error: any) {
      console.error('Ошибка при проверке подключения:', error);
      setError(error.message || 'Ошибка проверки подключения');
      fallbackToReadOnlyMode();
    } finally {
      // Всегда завершаем загрузку
      setIsLoading(false);
    }
  };

  // Вспомогательная функция для переключения в режим только чтения
  const fallbackToReadOnlyMode = () => {
    setIsLocalNode(true);
    setNetworkName('Режим просмотра');
    setChainId('0x539'); // Используем Hardhat ID для совместимости
    setConnectionStatus(ConnectionStatus.DISCONNECTED);
    console.log('Переключено в режим просмотра');
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      toast.info(`Аккаунт изменен: ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`, {
        autoClose: 3000
      });
    } else {
      setAccount(null);
      toast.info('Кошелек отключен', {
        autoClose: 3000
      });
    }
  };
  
  const handleChainChanged = async (chainId: string) => {
    setChainId(chainId);
    const networkName = getNetworkName(chainId);
    setNetworkName(networkName);
    setIsLocalNode(chainId === '0x539' || chainId === '1337');
    
    toast.info(`Сеть изменена: ${networkName}`, {
      autoClose: 3000
    });
    
    // Обновляем баланс при смене сети
    if (account) {
      await fetchBalance();
    }
    
    // Сбрасываем статистику сети и получаем новую
    setBlockTimes([]);
    setNetworkStats({
      blockNumber: null,
      gasPrice: null,
      txCount: null,
      lastBlockTime: null,
      avgBlockTime: null,
    });
    fetchNetworkStats();
  };

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        
        // Получаем текущую сеть
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        const networkName = getNetworkName(chainId);
        setNetworkName(networkName);
        setIsLocalNode(chainId === '0x539' || chainId === '1337'); // Hardhat или Ganache
        
        toast.success('Кошелек успешно подключен', {
          icon: <AccountBalanceWalletIcon style={{ color: '#2ECC71' }} />,
          autoClose: 3000
        });
      } else {
        // Используем локальную ноду по умолчанию
        setIsLocalNode(true);
        setNetworkName('Локальная нода');
        setChainId('0x539');
        
        toast.info('Используется локальная нода', {
          autoClose: 3000
        });
      }
    } catch (error: any) {
      console.error('Ошибка при подключении кошелька:', error);
      setError(error.message || 'Не удалось подключить кошелек');
      
      toast.error('Ошибка подключения кошелька', {
        icon: <ErrorIcon style={{ color: '#E74C3C' }} />,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const disconnectWallet = () => {
    // MetaMask не поддерживает программное отключение,
    // поэтому просто сбрасываем состояние приложения
    setAccount(null);
    setBalance(null);
    
    toast.info('Кошелек отключен в приложении', {
      autoClose: 3000
    });
  };
  
  const switchNetwork = async (networkId: string) => {
    if (!window.ethereum) {
      setError('MetaMask не установлен');
      return;
    }
    
    setIsLoading(true);
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkId }],
      });
      
      // Обработчик handleChainChanged будет вызван автоматически
    } catch (error: any) {
      // Если сеть не добавлена в MetaMask, предлагаем добавить
      if (error.code === 4902) {
        try {
          await addNetwork(networkId);
        } catch (addError: any) {
          setError(addError.message || 'Не удалось добавить сеть');
          toast.error('Не удалось переключить сеть', {
            icon: <ErrorIcon style={{ color: '#E74C3C' }} />,
          });
        }
      } else {
        setError(error.message || 'Не удалось переключить сеть');
        toast.error('Не удалось переключить сеть', {
          icon: <ErrorIcon style={{ color: '#E74C3C' }} />,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const addNetwork = async (networkId: string) => {
    if (networkId === '0xa869') {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xa869',
          chainName: 'Avalanche Fuji Testnet',
          nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18
          },
          rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://testnet.snowtrace.io/']
        }]
      });
    }
  };
  
  const fetchBalance = async () => {
    if (!account || !window.ethereum) return;
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const rawBalance = await provider.getBalance(account);
      const formattedBalance = ethers.utils.formatEther(rawBalance);
      
      // Округляем до 4 знаков после запятой
      setBalance(parseFloat(formattedBalance).toFixed(4));
    } catch (error) {
      console.error('Ошибка получения баланса:', error);
      setBalance(null);
    }
  };
  
  const fetchNetworkStats = async () => {
    try {
      let provider;
      
      if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } else if (isLocalNode) {
        provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
      } else {
        // Используем публичные RPC-провайдеры в зависимости от сети
        if (chainId === '0xa869') {
          provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
        } else {
          // Fallback на Infura для других сетей
          provider = new ethers.providers.InfuraProvider();
        }
      }
      
      // Получение номера текущего блока
      const blockNumber = await provider.getBlockNumber();
      
      // Получение данных блока
      const block = await provider.getBlock(blockNumber);
      const timestamp = block.timestamp;
      
      // Получение цены газа
      const gasPrice = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei');
      
      // Получение количества транзакций в блоке
      const txCount = block.transactions.length;
      
      // Обновляем историю времен блоков (максимум 10 последних)
      const newBlockTimes = [...blockTimes];
      if (newBlockTimes.length >= 10) {
        newBlockTimes.shift();
      }
      newBlockTimes.push(timestamp);
      setBlockTimes(newBlockTimes);
      
      // Расчет среднего времени блока (если есть хотя бы 2 блока)
      let avgBlockTime = null;
      if (newBlockTimes.length >= 2) {
        let totalDiff = 0;
        for (let i = 1; i < newBlockTimes.length; i++) {
          totalDiff += newBlockTimes[i] - newBlockTimes[i-1];
        }
        avgBlockTime = totalDiff / (newBlockTimes.length - 1);
      }
      
      setNetworkStats({
        blockNumber,
        gasPrice,
        txCount,
        lastBlockTime: timestamp,
        avgBlockTime,
      });
    } catch (error) {
      console.error('Ошибка получения сетевой статистики:', error);
    }
  };
  
  const refreshBalance = async () => {
    await fetchBalance();
  };
  
  const refreshNetworkStats = async () => {
    await fetchNetworkStats();
  };

  const getNetworkName = (chainId: string): string => {
    switch (chainId) {
      case '0xa869': return 'Avalanche Fuji Testnet';
      case '0x539': return 'Локальная нода (Hardhat)';
      case '0x1': return 'Ethereum Mainnet';
      case '0x5': return 'Goerli Testnet';
      case '0x13881': return 'Polygon Mumbai';
      case '0x89': return 'Polygon Mainnet';
      default: return `Неизвестная сеть (${chainId})`;
    }
  };

  const createToken = async (name: string, symbol: string, supply: string, description: string): Promise<string> => {
    try {
      const contract = getTokenFactoryContract();
      if (!contract) throw new Error('Контракт не инициализирован');

      const tx = await contract.createToken(name, symbol, ethers.utils.parseEther(supply), description);
      const receipt = await tx.wait();

      // Получаем адрес созданного токена из событий
      const event = receipt.events?.find((e: any) => e.event === 'TokenCreated');
      if (!event) throw new Error('Событие о создании токена не найдено');

      const tokenAddress = event.args.tokenAddress;
      return tokenAddress;
    } catch (error: any) {
      console.error('Ошибка при создании токена:', error);
      throw new Error(error.message || 'Не удалось создать токен');
    }
  };

  const getTokenFactoryContract = (): ethers.Contract | null => {
    if (!window.ethereum || !account) return null;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = '0xYourContractAddressHere'; // Замените на реальный адрес
      return new ethers.Contract(
        contractAddress,
        TokenFactoryABI,
        signer
      );
    } catch (error) {
      console.error('Ошибка получения контракта:', error);
      return null;
    }
  };

  const fetchTokens = async (): Promise<any[]> => {
    try {
      const contract = getTokenFactoryContract();
      if (!contract) return [];

      const count = await contract.getTokenCount();
      if (count.toNumber() === 0) return [];

      const tokens = await contract.getTokensInRange(0, count.toNumber());
      return tokens;
    } catch (error) {
      console.error('Ошибка при получении списка токенов:', error);
      return [];
    }
  };

  const switchToAvalanche = async (): Promise<void> => {
    if (!window.ethereum) throw new Error('MetaMask не установлен');
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa869' }], // Avalanche Fuji Testnet
      });
    } catch (error: any) {
      // Если сеть не добавлена, добавляем её
      if (error.code === 4902) {
        await addNetwork('0xa869');
      } else {
        throw error;
      }
    }
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        account,
        isLocalNode,
        isLoading,
        balance,
        networkName,
        chainId,
        error,
        darkMode,
        networkStats,
        connectionStatus,
        toggleDarkMode,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        refreshBalance,
        refreshNetworkStats,
        createToken,
        getTokenFactoryContract,
        fetchTokens,
        isCorrectNetwork,
        switchToAvalanche
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}; 