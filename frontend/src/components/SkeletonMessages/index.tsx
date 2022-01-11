import { Skeleton } from '@mui/material';

import * as S from './styles';

const SkeletonMessages = () => {
  return (
    <S.CardMessage>
      <Skeleton variant="rectangular" width={370} height={50} />
      <Skeleton variant="rectangular" width={300} height={30} />
      <Skeleton variant="rectangular" width={280} height={30} />
      <S.Date variant="rectangular" width={100} height={20} />
    </S.CardMessage>
  );
};

export { SkeletonMessages };
