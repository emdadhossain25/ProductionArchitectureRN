import errorLogger from '../logging/errorLogger';
import toastService from '../notification/toastService';

export const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;

      if (status === 401) {
        toastService.error('Session Expired', 'Please log in again');
      } else if (status === 403) {
        toastService.error('Access Denied', 'You do not have permission');
      } else if (status === 500) {
        toastService.error('Server Error', 'Please try again later');
      } else if (!error.response) {
        toastService.error('Network Error', 'Check your connection');
      }

      await errorLogger.logError(error, {
        url: error.config?.url,
        status,
      });

      return Promise.reject(error);
    }
  );
};
