import React, { useState, useEffect, useContext } from 'react';
import { 
  Button, 
  IconButton, 
  Tooltip, 
  CircularProgress 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Web3Context } from '../contexts/Web3Context';
import { addUserToken, getUserTokens } from '../services/userTokens';
import { toast } from 'react-toastify';

interface AddToPortfolioButtonProps {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  variant?: 'button' | 'icon';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onAdd?: () => void;
}

const AddToPortfolioButton: React.FC<AddToPortfolioButtonProps> = ({
  tokenAddress,
  tokenName,
  tokenSymbol,
  variant = 'button',
  size = 'medium',
  fullWidth = false,
  onAdd
}) => {
  const { account } = useContext(Web3Context);
  const [isInPortfolio, setIsInPortfolio] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if token is in user's portfolio
  useEffect(() => {
    if (!account) return;
    
    const userBinding = getUserTokens(account);
    if (userBinding) {
      setIsInPortfolio(userBinding.tokenAddresses.includes(tokenAddress));
    }
  }, [account, tokenAddress]);

  const handleAddToPortfolio = () => {
    if (!account) {
      toast.warning("Пожалуйста, подключите кошелёк", { autoClose: 3000 });
      return;
    }
    
    setLoading(true);
    
    try {
      addUserToken(account, tokenAddress);
      setIsInPortfolio(true);
      
      // Callback for parent components
      if (onAdd) onAdd();
      
      toast.success(`${tokenName} (${tokenSymbol}) добавлен в портфель`, { autoClose: 3000 });
    } catch (error) {
      console.error("Error adding token to portfolio:", error);
      toast.error("Не удалось добавить токен в портфель", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <Tooltip title={isInPortfolio ? "В вашем портфеле" : "Добавить в портфель"}>
        <span>
          <IconButton
            color={isInPortfolio ? "success" : "primary"}
            onClick={isInPortfolio ? undefined : handleAddToPortfolio}
            disabled={isInPortfolio || loading}
            size={size}
          >
            {loading ? (
              <CircularProgress size={size === 'small' ? 16 : 24} />
            ) : isInPortfolio ? (
              <CheckIcon />
            ) : (
              <AddIcon />
            )}
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <Button
      variant={isInPortfolio ? "outlined" : "contained"}
      color={isInPortfolio ? "success" : "primary"}
      startIcon={loading ? <CircularProgress size={16} /> : isInPortfolio ? <CheckIcon /> : <AddIcon />}
      onClick={isInPortfolio ? undefined : handleAddToPortfolio}
      disabled={isInPortfolio || loading}
      size={size}
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 'medium'
      }}
    >
      {isInPortfolio ? "В портфеле" : "Добавить в портфель"}
    </Button>
  );
};

export default AddToPortfolioButton; 