# Performance Monitoring

## Usage
```javascript
import { performanceMonitor } from '../services/monitoring';

// Measure function execution
const measure = performanceMonitor.startMeasure('API Call');
await fetchData();
measure.end();

// Measure component render
const renderMeasure = performanceMonitor.startMeasure('Component Render');
// render logic
renderMeasure.end();

// Get metrics
const metrics = performanceMonitor.getMetrics();
const average = performanceMonitor.getAverageTime('API Call');
const slowest = performanceMonitor.getSlowestOperations(5);
```

## What to Monitor

API calls, Screen transitions, Image loading, Database queries, Heavy calculations.

## View Metrics

In development console automatically. Export for analytics in production.

