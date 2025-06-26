import axios, { AxiosError, type AxiosResponse } from 'axios';
import { defaultConfig } from '../config';
import ErrorMessage from '../helpers/ErrorMessage';
const axiosInt = axios.create({
  baseURL: defaultConfig.baseAPIUrl,
});
axiosInt.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    ErrorMessage(error.message || 'Something went wrong');
    return Promise.reject(
      error.response?.data || 'There was an error!'
    );
  }
);

export default axiosInt;
