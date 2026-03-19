class AnalyticsTracker {
  constructor() {
    this.events = [];
    this.enabled = true;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  trackEvent(eventName, properties = {}) {
    if (!this.enabled) return;

    const event = {
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);

    if (__DEV__) {
      console.log('Analytics Event:', eventName, properties);
    }

    if (this.events.length > 50) {
      this.events.shift();
    }
  }

  trackScreen(screenName, properties = {}) {
    this.trackEvent('screen_view', {
      screen_name: screenName,
      ...properties,
    });
  }

  trackUserAction(action, properties = {}) {
    this.trackEvent('user_action', {
      action,
      ...properties,
    });
  }

  getEvents() {
    return this.events;
  }

  clear() {
    this.events = [];
  }
}

export default new AnalyticsTracker();
