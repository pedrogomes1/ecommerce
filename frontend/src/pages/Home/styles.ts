import styled from '@mui/material/styles/styled';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    display: 'flex',
  },
}));

export { Container };
