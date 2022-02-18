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

export type MessageProps = Array<{
  id: string;
  created_at: string;
  message: string;
  email: string;
}>;
