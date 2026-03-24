# Feature Flags System

## Usage
```javascript
import { featureFlags } from '../services/featureFlags';

// Check if feature enabled
if (featureFlags.isEnabled('socialLogin')) {
  return <SocialLoginButton />;
}

// Enable/disable features
featureFlags.enable('chatFeature');
featureFlags.disable('videoCall');

// Set flag value
featureFlags.setFlag('darkModeToggle', true);

// Get all flags
const flags = featureFlags.getAllFlags();
```

## Common Patterns
```javascript
// Conditional rendering
{featureFlags.isEnabled('newProfileUI') && <NewProfile />}

// Navigation conditional
if (featureFlags.isEnabled('chatFeature')) {
  navigation.navigate('Chat');
}

// Feature component
function ExperimentalFeature() {
  if (!featureFlags.isEnabled('advancedSearch')) {
    return null;
  }
  return <AdvancedSearchUI />;
}
```

## Available Flags

Authentication:
- socialLogin: Social media login
- biometricAuth: Face ID / Touch ID

UI Features:
- darkModeToggle: Dark mode switch
- newProfileUI: Redesigned profile

Experimental:
- offlineMode: Offline functionality
- advancedSearch: Advanced search filters

Beta:
- chatFeature: In-app chat
- videoCall: Video calling

## Production Integration

Ready to connect with:
- Firebase Remote Config
- LaunchDarkly
- Split.io
- ConfigCat

## Use Cases

A/B testing different features. Gradual rollout to users. Kill switch for broken features. Beta testing with subset. Platform-specific features.

