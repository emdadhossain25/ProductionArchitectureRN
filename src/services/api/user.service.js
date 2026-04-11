import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_CACHE_KEY = '@user_profile_cache';

class UserService {
  async getProfile() {
    try {
      const response = await client.get('/users/me');
      await this.cacheProfile(response.data);
      return response.data;
    } catch (error) {
      const cached = await this.getCachedProfile();
      if (cached) return cached;
      throw error;
    }
  }

  async updateProfile(updates) {
    const response = await client.put('/users/me', updates);
    await this.cacheProfile(response.data);
    return response.data;
  }

  async uploadAvatar(imageUri) {
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });

    const response = await client.post('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await this.cacheProfile(response.data);
    return response.data;
  }

  async deleteAvatar() {
    const response = await client.delete('/users/me/avatar');
    await this.cacheProfile(response.data);
    return response.data;
  }

  async changePassword(currentPassword, newPassword) {
    await client.put('/users/me/password', {
      currentPassword,
      newPassword,
    });
  }

  async changeEmail(newEmail, password) {
    const response = await client.put('/users/me/email', {
      email: newEmail,
      password,
    });
    return response.data;
  }

  async deleteAccount(password) {
    await client.delete('/users/me', {
      data: { password },
    });
    await this.clearCache();
  }

  async getUserById(userId) {
    const response = await client.get(`/users/${userId}`);
    return response.data;
  }

  async searchUsers(query, limit = 20) {
    const response = await client.get('/users/search', {
      params: { q: query, limit },
    });
    return response.data;
  }

  async cacheProfile(profile) {
    await AsyncStorage.setItem(
      USER_CACHE_KEY,
      JSON.stringify({
        data: profile,
        timestamp: Date.now(),
      })
    );
  }

  async getCachedProfile() {
    const cached = await AsyncStorage.getItem(USER_CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const maxAge = 5 * 60 * 1000; // 5 minutes

    if (Date.now() - timestamp > maxAge) {
      return null;
    }

    return data;
  }

  async clearCache() {
    await AsyncStorage.removeItem(USER_CACHE_KEY);
  }
}

export default new UserService();
