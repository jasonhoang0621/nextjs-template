export interface Response<T> {
  error?: string;
  message?: string;
  data?: T;
}
