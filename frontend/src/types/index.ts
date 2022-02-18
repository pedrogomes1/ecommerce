export enum RequestStatus {
  idle = 'idle',
  empty = 'empty',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export type CategoryProps = Array<{
  id: string;
  name: string;
  checked: boolean;
}>;
