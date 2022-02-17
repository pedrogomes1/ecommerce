import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  maxWidth: '50%',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
  flexDirection: 'column',
  gap: '15px',
}));

const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
}));

const Messages = styled('ul')(() => ({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '15px',
  padding: 0,
}));

const Message = styled('li')(() => ({
  width: '100%',
}));

const PaperCard = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  padding: '20px',

  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const IconArrowBack = styled(ArrowBack)(() => ({
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateX(-5px)',
  },
}));

export { Container, Form, Messages, Message, PaperCard, IconArrowBack };
