import styled from '@mui/material/styles/styled';

const Products = styled('ul')(() => ({
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '20px',
}));

export { Products };
