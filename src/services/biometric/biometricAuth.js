import AsyncStorage from '@react-native-async-storage/async-storage';

const BIOMETRIC_ENABLED_KEY = '@biometric_enabled';

class BiometricAuth {
  constructor() {
    this.available = false;
    this.type = null;
  }

  async isAvailable() {
    // Placeholder for react-native-biometrics or similar
    // Returns: { available: true, biometryType: 'FaceID' | 'TouchID' }
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Check biometric availability');
    }
    return { available: true, biometryType: 'FaceID' };
  }

  async authenticate(reason = 'Authenticate to continue') {
    const { available } = await this.isAvailable();

    if (!available) {
      return { success: false, error: 'Biometric not available' };
    }

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('Biometric auth:', reason);
      return { success: true };
    }

    // Placeholder for actual biometric prompt
    // Replace with react-native-biometrics.simplePrompt()
    return { success: true };
  }

  async isEnabled() {
    const enabled = await AsyncStorage.getItem(BIOMETRIC_ENABLED_KEY);
    return enabled === 'true';
  }

  async enable() {
    await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'true');
  }

  async disable() {
    await AsyncStorage.setItem(BIOMETRIC_ENABLED_KEY, 'false');
  }
}

export default new BiometricAuth();
