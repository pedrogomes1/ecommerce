import styled from '@mui/material/styles/styled';

const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '25px',
  },
}));

export { Header };
