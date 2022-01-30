import { Card, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardMessage = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: '15px',
  padding: '20px',
}));

const Date = styled(Skeleton)(() => ({
  alignSelf: 'flex-end',
}));

export { CardMessage, Date };
