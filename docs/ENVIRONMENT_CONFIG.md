# Environment Configuration

Project Path: /Users/emdadhossain/Code/react-native/ProductionArchitecture/ProductionArchitectureRN

---

## Environment Files

Three environments available:
- .env.development (local development)
- .env.staging (testing/QA)
- .env.production (live app)

---

## Configuration Variables

### Development
- API_BASE_URL: http://localhost:3000
- ENABLE_LOGGING: true
- ENABLE_DEBUG_MENU: true
- API_TIMEOUT: 30000ms

### Staging
- API_BASE_URL: https://staging-api.yourapp.com
- ENABLE_LOGGING: true
- ENABLE_DEBUG_MENU: false
- API_TIMEOUT: 30000ms

### Production
- API_BASE_URL: https://api.yourapp.com
- ENABLE_LOGGING: false
- ENABLE_DEBUG_MENU: false
- API_TIMEOUT: 10000ms

---

## Usage in Code
```javascript
import Config from 'react-native-config';

// Access variables
const apiUrl = Config.API_BASE_URL;
const isDebug = Config.ENABLE_DEBUG_MENU === 'true';

// In API service
axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: parseInt(Config.API_TIMEOUT),
});

// Conditional features
if (Config.ENABLE_LOGGING === 'true') {
  console.log('Debug mode enabled');
}
```

---

## Build Commands

### Development (default)
```bash
npm run ios
# Uses .env.development
```

### Staging
```bash
ENVFILE=.env.staging npm run ios
# Uses .env.staging
```

### Production
```bash
ENVFILE=.env.production npm run ios
# Uses .env.production
```

---

## Xcode Schemes (iOS)

Create separate schemes for each environment:
1. Open Xcode
2. Product → Scheme → Manage Schemes
3. Duplicate ProductionArchitectureRN
4. Rename to ProductionArchitectureRN-Staging
5. Repeat for Production
6. Set Pre-action scripts with ENVFILE

---

## Best Practices

Never commit:
- .env.local files
- API keys
- Secrets
- Passwords

Always commit:
- .env.development (with placeholder values)
- .env.staging (with placeholder values)
- .env.production (with placeholder values)

Use placeholder values in git, override locally with .env.*.local files.

---

## Environment Checklist

- [ ] .env files created
- [ ] react-native-config installed
- [ ] iOS pods installed
- [ ] Variables accessed in code
- [ ] Tested in each environment
- [ ] Secrets not committed

---

Last Updated: Day 62/100
