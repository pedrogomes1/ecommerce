import styled from '@mui/material/styles/styled';

const Aside = styled('aside')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  minWidth: '250px',
  borderRight: '1px solid #444',
  marginLeft: theme.spacing(2),
}));

const Products = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
}));

const Product = styled('li')(({ theme }) => ({
  // border: '1px solid red',
}));
export { Aside, Products, Product };
