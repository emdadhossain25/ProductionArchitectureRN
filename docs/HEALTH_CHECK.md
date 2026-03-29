# App Health Check

## Usage
```javascript
import { healthCheck } from '../services/health';

// Full system check
const health = await healthCheck.runFullCheck();
console.log('App health:', health.overall);

// Individual checks
const connectivity = await healthCheck.checkConnectivity();
const storage = await healthCheck.checkStorage();
const memory = await healthCheck.checkMemory();

// Get diagnostics
const diagnostics = await healthCheck.getDiagnostics();
```

## Health Checks

Connectivity: Network connection status and type
Storage: AsyncStorage read/write capability
Memory: JavaScript heap usage and limits

## Status Values

healthy: All systems operational
degraded: Some issues detected
offline: No network connection
warning: Memory usage high
error: Critical failure

## Use Cases

App startup verification. Background health monitoring. Troubleshooting user issues. Support ticket diagnostics. Performance monitoring.

