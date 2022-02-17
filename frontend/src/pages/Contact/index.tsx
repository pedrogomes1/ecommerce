import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Alert, Grow } from '@mui/material';
import toast from 'react-hot-toast';

import { SkeletonMessages } from '../../components/SkeletonMessages';
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
const skeletonMessages = Array.from({ length: 3 }, (_, index) => index);

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

  const navigate = useNavigate();

  const fetchMessages = async () => {
    setStatus(loading);
    try {
      const { data } = await api.get('/message');

      const hasMessages = !!data.length;

      setMessages(formatMessagesData(data));
      setStatus(hasMessages ? success : empty);
    } catch (err) {
      setStatus(error);
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
      toast.success('Mensagem cadastrada com sucesso!');
    } catch (error) {
      toast.error('Erro ao cadastrar a mensagem!');
    }
  };

  const handleNavigateToHome = () => {
    navigate(-1);
  };

  return (
    <S.Container>
      <div>
        <S.IconArrowBack fontSize="large" onClick={handleNavigateToHome} />
        <Typography variant="h5" align="center">
          Deixe-nos uma mensagem!
        </Typography>
      </div>
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

      {status === loading ? (
        skeletonMessages.map((item) => <SkeletonMessages key={item} />)
      ) : status === error ? (
        <Typography variant="h5">Erro ao carregar mensagens</Typography>
      ) : status === empty ? (
        <Typography variant="h5">Nenhuma mensagem cadstrada</Typography>
      ) : (
        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1500}>
          <S.Messages>
            {messages.map(({ id, email, message, created_at }) => (
              <S.Message key={id}>
                <S.PaperCard>
                  <Typography variant="h6">{email}</Typography>
                  <Typography variant="body1" data-testid="message">
                    {message}
                  </Typography>
                  <Typography
                    variant="caption"
                    data-testid="date"
                    marginLeft="auto"
                  >
                    {created_at}
                  </Typography>
                </S.PaperCard>
              </S.Message>
            ))}
          </S.Messages>
        </Grow>
      )}
    </S.Container>
  );
};

export { Contact };
