import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'ERROR NO SERVER URL CONFIGURED';

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const useGet = (url: string, config = {}) => {
  return apiClient.get(url, config);
}