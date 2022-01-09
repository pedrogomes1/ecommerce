import styled from '@mui/material/styles/styled';

const Products = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '20px',
}));

const Product = styled('li')(({ theme }) => ({
  // display: 'flex',
  // flex: 1,
}));
export { Products, Product };
