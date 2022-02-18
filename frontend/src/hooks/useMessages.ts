import { useEffect, useState } from 'react';

import { formatMessagesData } from '../pages/Contact/utils';
import { MessageProps, RequestStatus } from '../types';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const { idle, empty, error, loading, success } = RequestStatus;

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageProps>([]);
  const [status, setStatus] = useState<RequestStatus>(idle);

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

  const createNewMessage = async (email: string, message: string) => {
    setStatus(loading);
    try {
      await api.post('/message', { email, message });
      fetchMessages();
      toast.success('Mensagem cadastrada com sucesso!');
    } catch (error) {
      toast.error('Erro ao cadastrar a mensagem!');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, fetchMessages, status, createNewMessage };
};
