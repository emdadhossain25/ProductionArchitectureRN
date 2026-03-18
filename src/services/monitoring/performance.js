class PerformanceMonitor {
  constructor() {
    this.metrics = [];
  }

  startMeasure(name) {
    const start = Date.now();
    return {
      end: () => {
        const duration = Date.now() - start;
        this.recordMetric(name, duration);
        return duration;
      },
    };
  }

  recordMetric(name, duration) {
    const metric = {
      name,
      duration,
      timestamp: Date.now(),
    };

    this.metrics.push(metric);

    if (__DEV__) {
      console.log(`Performance: ${name} took ${duration}ms`);
    }

    if (this.metrics.length > 100) {
      this.metrics.shift();
    }
  }

  getMetrics() {
    return this.metrics;
  }

  getAverageTime(name) {
    const filtered = this.metrics.filter((m) => m.name === name);
    if (filtered.length === 0) return 0;

    const total = filtered.reduce((sum, m) => sum + m.duration, 0);
    return total / filtered.length;
  }

  getSlowestOperations(limit = 10) {
    return [...this.metrics]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);
  }

  clear() {
    this.metrics = [];
  }
}

export default new PerformanceMonitor();
