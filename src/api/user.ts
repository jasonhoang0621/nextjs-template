import { useQuery, useMutation } from 'react-query';
import axiosClient from 'src/config/axios';
import { Response } from 'src/types/api.type';

export type LoginRequest = {
  phoneNumber?: string;
  password?: string;
};
interface LoginResponse {
  name: string;
  email: string;
}
export type RegisterRequest = {
  phoneNumber?: string;
  password?: string;
  code?: string;
};
export type RegisterResponse = {
  statusCode: number;
  message?: string;
  args?: any;
};
export type ProfileResponse = {
  errorCode: boolean;
  data: any;
};

const useLogin = () => {
  return useMutation(
    (payload: LoginRequest): Promise<Response<LoginResponse>> => axiosClient.post('/login', payload)
  );
};

const useSendOTPRegister = () => {
  return useMutation(
    (payload: LoginRequest): Promise<RegisterResponse> =>
      axiosClient.post('/csm/auth/send-otp/sign-up', payload)
  );
};

const useRegister = () => {
  return useMutation(
    (payload: RegisterRequest): Promise<RegisterResponse> =>
      axiosClient.post('/csm/Auth/sign-up/phone', payload)
  );
};

const useProfile = () => {
  return useQuery('profile', (): Promise<ProfileResponse> => axiosClient.get('/csm/auth/me'));
};

export { useLogin, useRegister, useProfile, useSendOTPRegister };
