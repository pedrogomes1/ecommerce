import { styled } from '@mui/material/styles';

const Aside = styled('aside')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '250px',
  borderRight: '1px solid #444',

  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    borderBottom: '1px solid #444',
    paddingBottom: '10px',
  },
}));

export { Aside };
