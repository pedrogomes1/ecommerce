import { Skeleton } from '@mui/material';

import * as S from './styles';

const SkeletonProducts = () => {
  return (
    <S.Container>
      <Skeleton variant="rectangular" width={270} height={250} />
      <Skeleton variant="rectangular" width={270} height={20} />
      <Skeleton variant="rectangular" width={135} height={20} />
    </S.Container>
  );
};

export { SkeletonProducts };
