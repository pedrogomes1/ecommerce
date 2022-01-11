import styled from '@mui/material/styles/styled';

const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  marginBottom: '30px',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '25px',
  },
}));

const Logo = styled('img')(() => ({
  width: '100%',
  height: '100%',
  maxWidth: '100px',
  maxHeight: '70px',
  cursor: 'pointer',
}));

export { Header, Logo };
