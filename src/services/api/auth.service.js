import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@access_token';
const REFRESH_KEY = '@refresh_token';
const EXPIRY_KEY = '@token_expiry';
const USER_KEY = '@user_data';

class AuthService {
  async login(email, password) {
    try {
      const response = await client.post('/auth/login', {
        email,
        password,
      });

      await this.storeAuthData(response.data);
      return response.data.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  async register(userData) {
    try {
      const response = await client.post('/auth/register', userData);
      await this.storeAuthData(response.data);
      return response.data.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  async logout() {
    try {
      await client.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      await this.clearAuthData();
    }
  }

  async refreshToken() {
    const refreshToken = await this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await client.post('/auth/refresh', {
      refreshToken,
    });

    await this.storeAuthData(response.data);
    return response.data.accessToken;
  }

  async getCurrentUser() {
    try {
      const response = await client.get('/auth/me');
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async storeAuthData(data) {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, data.accessToken],
      [REFRESH_KEY, data.refreshToken],
      [EXPIRY_KEY, String(data.expiresAt)],
      [USER_KEY, JSON.stringify(data.user)],
    ]);
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(TOKEN_KEY);
  }

  async getRefreshToken() {
    return await AsyncStorage.getItem(REFRESH_KEY);
  }

  async getStoredUser() {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  async isTokenExpired() {
    const expiry = await AsyncStorage.getItem(EXPIRY_KEY);
    if (!expiry) return true;
    return Date.now() >= parseInt(expiry, 10);
  }

  async clearAuthData() {
    await AsyncStorage.multiRemove([
      TOKEN_KEY,
      REFRESH_KEY,
      EXPIRY_KEY,
      USER_KEY,
    ]);
  }

  async isAuthenticated() {
    const token = await this.getAccessToken();
    const expired = await this.isTokenExpired();
    return token && !expired;
  }

  handleAuthError(error) {
    if (error.response?.status === 401) {
      return new Error('Invalid credentials');
    }
    if (error.response?.status === 422) {
      return new Error('Validation failed');
    }
    return new Error('Authentication failed');
  }
}

export default new AuthService();
