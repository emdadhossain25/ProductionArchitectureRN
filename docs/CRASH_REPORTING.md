# Crash Reporting

## Usage
```javascript
import { crashReporter } from '../services/crashReporting';

// Record crashes (from ErrorBoundary)
crashReporter.recordCrash(error, errorInfo);

// Record errors
try {
  riskyOperation();
} catch (error) {
  crashReporter.recordError(error, {
    operation: 'riskyOperation',
    userId: user.id,
  });
}

// Record warnings
crashReporter.recordWarning('API slow response', {
  endpoint: '/api/users',
  duration: 5000,
});
```

## Integration Points

ErrorBoundary component. API error interceptors. Async operation failures. Performance issues.

## Production Services

Ready to integrate with:
- Sentry (recommended)
- Firebase Crashlytics
- Bugsnag
- Instabug

## What Gets Recorded

Error message and stack trace. Component stack for React errors. App version and platform. Timestamp. Custom context data.

## Privacy

No user data in crash reports unless explicitly added. Sanitize sensitive information. Follow data privacy regulations.

