import React from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  styled,
  useTheme,
  IconButton,
  Tooltip,
  Button,
  alpha
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { motion } from 'framer-motion';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: 'var(--input-bg)',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--border-color)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CreateButton = styled(Button)(({ theme }) => ({
  background: 'var(--button-gradient)',
  color: '#fff',
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '12px',
  padding: '8px 16px',
  boxShadow: 'var(--shadow-sm)',
  '&:hover': {
    boxShadow: 'var(--shadow-md)',
    transform: 'translateY(-2px)',
    background: 'var(--button-gradient-hover)',
  },
  transition: 'all 0.3s ease',
}));

interface FiltersBarProps {
  onSortChange: (value: string) => void;
  sortValue: string;
  onRefresh?: () => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({ 
  onSortChange, 
  sortValue, 
  onRefresh 
}) => {
  const theme = useTheme();

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    onSortChange(event.target.value);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap'
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SortIcon sx={{ color: 'text.secondary' }} />
        <StyledFormControl size="small">
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortValue}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
            <MenuItem value="name">Name (A-Z)</MenuItem>
          </Select>
        </StyledFormControl>
      </Box>

      {onRefresh && (
        <Tooltip title="Refresh list">
          <IconButton
            onClick={onRefresh}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
      )}
      
      <CreateButton
        component={Link as any}
        to="/create-token"
        startIcon={<AddCircleOutlineIcon />}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          ml: { sm: 'auto' }
        }}
      >
        Create New Token
      </CreateButton>
    </Box>
  );
}; 