# Push Notifications Setup

## Service Methods
```javascript
import { pushNotificationService } from '../services/notifications';

// Request permission
await pushNotificationService.requestPermission();

// Get device token
const token = await pushNotificationService.getToken();

// Register device with backend
await pushNotificationService.registerDevice(userId);

// Handle incoming notification
pushNotificationService.handleNotification(notification);
```

## iOS Setup Required

1. Enable Push Notifications capability in Xcode
2. Add APNs key in Apple Developer portal
3. Configure in App Store Connect

## Production Integration

Ready for:
- Firebase Cloud Messaging
- OneSignal
- Pusher Beams
- Amazon SNS

## Notification Types

Promotional messages. Order updates. Chat messages. System alerts. Scheduled reminders.

