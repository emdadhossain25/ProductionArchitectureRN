import client from './client';
import { appSettings } from '../settings';

class SettingsService {
  async syncToServer() {
    const localSettings = appSettings.getAll();
    const response = await client.put('/settings', localSettings);
    return response.data;
  }

  async syncFromServer() {
    const response = await client.get('/settings');
    const serverSettings = response.data;

    // Merge server settings with local
    for (const [category, values] of Object.entries(serverSettings)) {
      for (const [key, value] of Object.entries(values)) {
        await appSettings.set(`${category}.${key}`, value);
      }
    }

    return serverSettings;
  }

  async resetToDefaults() {
    await client.delete('/settings');
    await appSettings.reset();
  }

  async getServerSettings() {
    const response = await client.get('/settings');
    return response.data;
  }

  async updateSetting(path, value) {
    await appSettings.set(path, value);
    await this.syncToServer();
  }
}

export default new SettingsService();
