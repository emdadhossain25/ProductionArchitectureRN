# App Settings System

## Usage
```javascript
import { appSettings } from '../services/settings';

// Load settings
await appSettings.load();

// Get setting
const notificationsEnabled = appSettings.get('notifications.enabled');
const theme = appSettings.get('display.theme');

// Set setting
await appSettings.set('notifications.sound', false);
await appSettings.set('display.fontSize', 'large');

// Get all settings
const all = appSettings.getAll();

// Reset to defaults
await appSettings.reset();
```

## Default Settings

Notifications: enabled, sound, vibration
Privacy: analytics, crash reporting
Display: theme (auto/light/dark), font size
Account: auto-login, biometric auth

## Settings Categories

Notifications control push preferences. Privacy manages data collection. Display handles appearance. Account manages login options.

## Integration

Settings sync with feature flags. Privacy settings control analytics. Display settings affect theme. Account settings control auth flow.

