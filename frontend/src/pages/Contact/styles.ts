import styled from '@mui/material/styles/styled';
import { Paper } from '@mui/material';

const Container = styled('div')(() => ({
  display: 'flex',
  maxWidth: '50%',
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
}));

export { Container, Form, Messages, Message, PaperCard };
