import React, { useState } from 'react';
import { 
  Box, 
  Chip, 
  IconButton, 
  Menu, 
  MenuItem, 
  Paper, 
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  SelectChangeEvent,
  InputLabel,
  Divider
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { motion } from 'framer-motion';

const categories = [
  { label: 'Все категории', value: 'all' },
  { label: 'Общепит', value: 'food' },
  { label: 'Технологии', value: 'tech' },
  { label: 'Образование', value: 'education' },
  { label: 'Транспорт', value: 'transport' },
  { label: 'Здоровье', value: 'health' },
  { label: 'Развлечения', value: 'entertainment' },
  { label: 'Спорт', value: 'sport' },
  { label: 'Туризм', value: 'tourism' }
];

const FiltersBar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState('newest');
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (sortType: string) => {
    setSortType(sortType);
    handleSortMenuClose();
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchText('');
    setSortType('newest');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          mb: 4, 
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 2,
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: { xs: '100%', md: 'auto' } }}>
            <TextField
              placeholder="Поиск проектов..."
              size="small"
              value={searchText}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 'var(--radius-md)' }
              }}
              sx={{ 
                minWidth: { xs: '100%', sm: 220 },
                '& .MuiOutlinedInput-root': {
                  fontSize: '0.9rem'
                }
              }}
            />
            
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="sort-select-label">Сортировка</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortType}
                label="Сортировка"
                sx={{ 
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem'
                }}
                onChange={(e: SelectChangeEvent) => handleSortSelect(e.target.value)}
              >
                <MenuItem value="newest">Сначала новые</MenuItem>
                <MenuItem value="progress">По прогрессу сбора</MenuItem>
                <MenuItem value="price-asc">По цене (возр.)</MenuItem>
                <MenuItem value="price-desc">По цене (убыв.)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          <Divider orientation="horizontal" sx={{ display: { xs: 'block', md: 'none' }, width: '100%' }} />
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: { xs: '100%', md: 'auto' }, 
            overflowX: { xs: 'auto', md: 'visible' }, 
            pb: { xs: 1, md: 0 }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <CategoryIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                Категории:
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: { xs: 'nowrap', md: 'wrap' } }}>
              {categories.map((category) => (
                <Chip
                  key={category.value}
                  label={category.label}
                  clickable
                  color={selectedCategory === category.value ? 'primary' : 'default'}
                  onClick={() => handleCategoryChange(category.value)}
                  size="small"
                  sx={{ 
                    whiteSpace: 'nowrap',
                    fontWeight: selectedCategory === category.value ? 'bold' : 'normal'
                  }}
                />
              ))}
            </Box>
          </Box>
          
          <IconButton 
            onClick={resetFilters} 
            color="primary" 
            size="small"
            sx={{ 
              display: 'flex',
              ml: { xs: 'auto', md: 0 }
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default FiltersBar; 