import { MessageProps } from '../../types';

const formatMessagesData = (messages: MessageProps) => {
  return messages.map((message) => ({
    ...message,
    created_at: new Date(message.created_at).toLocaleDateString(),
  }));
};

export { formatMessagesData };
