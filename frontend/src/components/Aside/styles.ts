import styled from '@mui/material/styles/styled';

const Aside = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '250px',
  borderRight: '1px solid #444',
  marginLeft: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    borderBottom: '1px solid #444',
    paddingBottom: '10px',
  },
}));

export { Aside };
