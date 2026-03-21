class CrashReporter {
  constructor() {
    this.crashes = [];
    this.enabled = true;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  recordCrash(error, errorInfo = {}) {
    if (!this.enabled) return;

    const crash = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      appVersion: '1.0.0',
      platform: 'iOS',
    };

    this.crashes.push(crash);

    if (__DEV__) {
      console.error('Crash Recorded:', crash);
    }

    this.sendToServer(crash);
  }

  recordError(error, context = {}) {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      severity: 'error',
    };

    this.crashes.push(errorReport);

    if (__DEV__) {
      console.error('Error Recorded:', errorReport);
    }
  }

  recordWarning(message, context = {}) {
    const warning = {
      message,
      context,
      timestamp: new Date().toISOString(),
      severity: 'warning',
    };

    this.crashes.push(warning);
  }

  sendToServer(crash) {
    // Replace with actual crash reporting service
    // Examples: Sentry, Bugsnag, Firebase Crashlytics
    if (__DEV__) {
      console.log('Would send to crash reporting service:', crash);
    }
  }

  getCrashes() {
    return this.crashes;
  }

  clear() {
    this.crashes = [];
  }
}

export default new CrashReporter();
