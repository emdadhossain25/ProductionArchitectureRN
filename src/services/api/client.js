import axios from 'axios';
import Config from 'react-native-config';
import { setupInterceptors } from './interceptors';
import { setupTokenInterceptor } from './tokenInterceptor';

const client = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: parseInt(Config.API_TIMEOUT, 10),
  headers: {
    'Content-Type': 'application/json',
  },
});

setupTokenInterceptor(client);
setupInterceptors(client);

export default client;
