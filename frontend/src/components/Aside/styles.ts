import styled from '@mui/material/styles/styled';

const Aside = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '250px',
  borderRight: '1px solid #444',
  marginLeft: theme.spacing(2),
}));

export { Aside };
