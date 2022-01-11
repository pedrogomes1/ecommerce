import { Card } from '@mui/material';
import styled from '@mui/material/styles/styled';

const Products = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  listStyle: 'none',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const CardProduct = styled(Card)(() => ({
  minWidth: '300px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const SkeletonContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
}));

export { Products, CardProduct, SkeletonContainer };
