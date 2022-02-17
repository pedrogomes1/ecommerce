import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const Products = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  listStyle: 'none',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    padding: 0,
  },
}));

const CardProduct = styled(Card)(() => ({
  width: '300px',
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
