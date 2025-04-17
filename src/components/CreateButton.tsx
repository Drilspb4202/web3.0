import { styled } from '@mui/material/styles';
import { LinkButton } from './LinkButton';

export const CreateButton = styled(LinkButton)(({ theme }) => ({
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