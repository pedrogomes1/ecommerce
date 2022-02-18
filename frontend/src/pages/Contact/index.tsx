import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, TextField, Alert, Grow } from '@mui/material';

import { RequestStatus } from '../../types';
import { useMessages } from '../../hooks/useMessages';
import { SkeletonMessages } from '../../components/SkeletonMessages';

import * as S from './styles';

const { empty, error, loading } = RequestStatus;
const skeletonMessages = Array.from({ length: 3 }, (_, index) => index);

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [shoudDisplayErrorFormMessage, setShouldDisplayErrorFormMessage] =
    useState(false);

  const navigate = useNavigate();
  const { status, messages, createNewMessage } = useMessages();

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

    await createNewMessage(email, message);
    setEmail('');
    setMessage('');
    if (shoudDisplayErrorFormMessage) setShouldDisplayErrorFormMessage(false);
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
