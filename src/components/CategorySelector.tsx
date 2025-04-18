import React from 'react';
import { Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  categories, 
  selectedCategory, 
  onChange 
}) => {
  const theme = useTheme();
  
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        py: 1
      }}
    >
      {categories.map((category) => (
        <Chip
          key={category.id}
          label={category.name}
          onClick={() => onChange(category.id)}
          variant={selectedCategory === category.id ? "filled" : "outlined"}
          color={selectedCategory === category.id ? "primary" : "default"}
          sx={{
            borderRadius: '16px',
            fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: selectedCategory === category.id 
                ? theme.palette.primary.main
                : theme.palette.action.hover,
              transform: 'translateY(-2px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }
          }}
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      ))}
    </Box>
  );
};

export default CategorySelector; 