import axios from 'axios';
import Config from 'react-native-config';
import { setupInterceptors } from './interceptors';

const client = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: parseInt(Config.API_TIMEOUT, 10),
});

setupInterceptors(client);

export default client;
