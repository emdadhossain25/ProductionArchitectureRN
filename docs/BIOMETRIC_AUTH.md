# Biometric Authentication

## Usage
```javascript
import { biometricAuth } from '../services/biometric';

// Check availability
const { available, biometryType } = await biometricAuth.isAvailable();
// biometryType: 'FaceID' or 'TouchID'

// Authenticate
const result = await biometricAuth.authenticate('Login to your account');
if (result.success) {
  // Proceed with login
}

// Enable/disable
await biometricAuth.enable();
await biometricAuth.disable();
const enabled = await biometricAuth.isEnabled();
```

## iOS Setup

1. Add NSFaceIDUsageDescription to Info.plist
2. Install react-native-biometrics package
3. Test on physical device (simulator limited)

## Production Package

Install: npm install react-native-biometrics
Replace placeholder methods with actual implementation.

## Use Cases

Quick login without password. Secure payment confirmation. Access sensitive features. App unlock after backgrounding.

## Security

Biometric data never leaves device. Apple handles all authentication. App only receives success/failure. No biometric storage needed.

