import React, { useEffect, useContext } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { styled } from '@mui/system';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Web3Context } from '../contexts/Web3Context';

// Анимированная кнопка переключения с эффектом всплывания
const AnimatedToggle = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  transition: 'transform 0.3s ease',
  backgroundColor: 'var(--card-bg)',
  color: 'var(--text-color)',
  border: '2px solid var(--border-color)',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: 'var(--primary-light)',
    color: '#fff',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    opacity: 0,
    boxShadow: '0 0 15px var(--primary-color)',
  },
  '&:hover::after': {
    opacity: 0.7,
  }
}));

// Анимированный контейнер для иконки
const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'rotate-toggle 0.5s ease-out',
  '@keyframes rotate-toggle': {
    '0%': {
      transform: 'rotate(-45deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    }
  }
}));

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useContext(Web3Context);

  // Установка атрибута data-theme для корневого элемента
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Tooltip title={darkMode ? "Включить светлый режим" : "Включить темный режим"} arrow>
      <AnimatedToggle onClick={toggleDarkMode} size="large">
        <IconContainer>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconContainer>
      </AnimatedToggle>
    </Tooltip>
  );
};

export default ThemeToggle; 