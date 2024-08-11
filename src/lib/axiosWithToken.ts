import axios from 'axios';
import { usePrivy } from '@privy-io/react-auth';

export const useAxiosWithPrivy = () => {
  const { getAccessToken } = usePrivy();

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return axiosInstance;
};