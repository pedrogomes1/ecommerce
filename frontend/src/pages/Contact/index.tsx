import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Typography, Button, TextField, Alert } from '@mui/material';

import { RequestStatus } from '../../types';

import { api } from '../../services/api';

import * as S from './styles';

type MessageProps = Array<{
  id: string;
  created_at: string;
  message: string;
  email: string;
}>;

const { idle, empty, error, loading, success } = RequestStatus;

const formatMessagesData = (messages: MessageProps) => {
  return messages.map((message) => ({
    ...message,
    created_at: new Date(message.created_at).toLocaleDateString(),
  }));
};

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageProps>([]);
  const [status, setStatus] = useState<RequestStatus>(idle);
  const [shoudDisplayErrorFormMessage, setShouldDisplayErrorFormMessage] =
    useState(false);

  const fetchMessages = async () => {
    setStatus(loading);
    try {
      const { data } = await api.get('/message');
      setMessages(formatMessagesData(data));
      setStatus(data.length ? success : empty);
    } catch (err) {
      setStatus(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmitMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !message) {
      return setShouldDisplayErrorFormMessage(true);
    }
    setStatus(loading);
    try {
      await api.post('/message', { email, message });
      setEmail('');
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <Typography variant="h5">Deixe-nos uma mensagem!</Typography>
      <S.Form onSubmit={handleSubmitMessage}>
        <TextField
          label="E-mail"
          type="email"
          value={email}
          onChange={handleChangeEmail}
        />
        <TextField
          label="Mensagem"
          multiline
          rows={4}
          value={message}
          onChange={handleChangeMessage}
        />
        {shoudDisplayErrorFormMessage && (
          <Alert variant="outlined" severity="error">
            Por favor, preencha o nome e a mensagem desejada.
          </Alert>
        )}
        <Button variant="contained" color="primary" type="submit">
          Enviar
        </Button>
      </S.Form>

      {status === 'loading' ? (
        <Typography variant="h5">Carregando...</Typography>
      ) : status === 'error' ? (
        <Typography variant="h5">Erro ao carregar mensagens</Typography>
      ) : status === 'empty' ? (
        <Typography variant="h5">Nenhuma mensagem cadstrada</Typography>
      ) : (
        <S.Messages>
          {messages.map((message) => (
            <S.Message key={message.id}>
              <S.PaperCard>
                <Typography variant="h6">{message.email}</Typography>
                <Typography variant="body1">{message.message}</Typography>
                <Typography variant="caption" marginLeft="auto">
                  {message.created_at}
                </Typography>
              </S.PaperCard>
            </S.Message>
          ))}
        </S.Messages>
      )}
    </S.Container>
  );
};

export { Contact };
