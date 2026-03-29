import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HealthCheck {
  async checkConnectivity() {
    const state = await NetInfo.fetch();
    return {
      connected: state.isConnected,
      type: state.type,
      status: state.isConnected ? 'healthy' : 'offline',
    };
  }

  async checkStorage() {
    try {
      const testKey = '@health_check';
      await AsyncStorage.setItem(testKey, 'test');
      await AsyncStorage.getItem(testKey);
      await AsyncStorage.removeItem(testKey);
      return { status: 'healthy', available: true };
    } catch (error) {
      return { status: 'error', available: false, error: error.message };
    }
  }

  async runFullCheck() {
    const [connectivity, storage] = await Promise.all([
      this.checkConnectivity(),
      this.checkStorage(),
    ]);

    const overall =
      connectivity.status === 'healthy' && storage.status === 'healthy'
        ? 'healthy'
        : 'degraded';

    return {
      overall,
      connectivity,
      storage,
      timestamp: new Date().toISOString(),
    };
  }

  async getDiagnostics() {
    const health = await this.runFullCheck();
    return {
      ...health,
      appVersion: '1.0.0',
      platform: 'iOS',
    };
  }
}

export default new HealthCheck();
