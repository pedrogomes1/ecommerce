import { useState, useEffect } from 'react';
import { Typography, Button, TextField, Paper } from '@mui/material';

import { RequestStatus } from '../../types';

import { api } from '../../services/api';

import * as S from './styles';

type MessageProps = Array<{
  id: string;
  created_at: string;
  message: string;
  emaiL: string;
}>;

const { idle, empty, error, loading, success } = RequestStatus;

const Contact = () => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState<MessageProps>([]);
  const [status, setStatus] = useState<RequestStatus>(idle);

  useEffect(() => {
    const fetchMessages = async () => {
      setStatus(loading);
      try {
        const { data } = await api.get('/message');
        setMessages(data);
        setStatus(data.length ? success : empty);
      } catch (err) {
        setStatus(error);
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <S.Container>
      <Typography variant="h5">Deixe-nos uma mensagem!</Typography>
      <TextField
        label="Name"
        value={author}
        onChange={(event) => {
          setAuthor(event.target.value);
        }}
      />
      <TextField
        label="Message"
        multiline
        rows={4}
        value={content}
        onChange={(event) => {
          setContent(event.target.value);
        }}
      />

      <Button variant="contained" color="primary">
        Enviar
      </Button>

      {status === 'loading' ? (
        <Typography variant="h5">Carregando...</Typography>
      ) : status === 'error' ? (
        <Typography variant="h5">Erro ao carregar mensagens</Typography>
      ) : status === 'empty' ? (
        <Typography variant="h5">Nenhuma mensagem cadstrada</Typography>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <Paper>{message.message}</Paper>
            </li>
          ))}
        </ul>
      )}
    </S.Container>
  );
};

export { Contact };
