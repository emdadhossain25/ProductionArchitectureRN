# Analytics Tracking

## Events

Track user actions and screens:
```javascript
import { analyticsTracker } from '../services/analytics';

// Track screen views
analyticsTracker.trackScreen('Home');

// Track user actions
analyticsTracker.trackUserAction('button_click', {
  button_name: 'login',
});

// Track custom events
analyticsTracker.trackEvent('purchase', {
  amount: 99.99,
  currency: 'USD',
});
```

## Common Events

Screen views: Home, Profile, Settings
User actions: Login, Logout, Add Item, Delete Item
Business events: Purchase, Subscription, Share

## Integration

Ready for: Firebase Analytics, Mixpanel, Amplitude, Segment.

Replace tracker with actual SDK when ready.

