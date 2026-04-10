import authService from './auth.service';

export const setupTokenInterceptor = (axiosInstance) => {
  // Add token to requests
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await authService.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle token refresh on 401
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await authService.refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          await authService.clearAuthData();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
