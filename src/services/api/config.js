import Config from 'react-native-config';

export const API_CONFIG = {
  baseURL: Config.API_BASE_URL || 'http://localhost:3000',
  timeout: parseInt(Config.API_TIMEOUT) || 30000,
  enableLogging: Config.ENABLE_LOGGING === 'true',
  enableDebugMenu: Config.ENABLE_DEBUG_MENU === 'true',
  environment: Config.APP_ENV || 'development',
};

export const isProduction = () => API_CONFIG.environment === 'production';
export const isDevelopment = () => API_CONFIG.environment === 'development';
export const isStaging = () => API_CONFIG.environment === 'staging';
