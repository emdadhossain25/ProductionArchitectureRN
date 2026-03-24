class FeatureFlags {
  constructor() {
    this.flags = {
      // Authentication features
      socialLogin: false,
      biometricAuth: false,

      // UI features
      darkModeToggle: true,
      newProfileUI: false,

      // Experimental features
      offlineMode: true,
      advancedSearch: false,

      // Beta features
      chatFeature: false,
      videoCall: false,
    };
  }

  isEnabled(flagName) {
    return this.flags[flagName] || false;
  }

  enable(flagName) {
    this.flags[flagName] = true;
  }

  disable(flagName) {
    this.flags[flagName] = false;
  }

  setFlag(flagName, value) {
    this.flags[flagName] = value;
  }

  getAllFlags() {
    return { ...this.flags };
  }

  enableAll() {
    Object.keys(this.flags).forEach((key) => {
      this.flags[key] = true;
    });
  }

  disableAll() {
    Object.keys(this.flags).forEach((key) => {
      this.flags[key] = false;
    });
  }
}

export default new FeatureFlags();
