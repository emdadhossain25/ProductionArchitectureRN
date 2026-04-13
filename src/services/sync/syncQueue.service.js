import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import client from '../api/client';

const QUEUE_KEY = '@sync_queue';
const LAST_SYNC_KEY = '@last_sync_timestamp';

class SyncQueueService {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.listeners = [];
  }

  async initialize() {
    await this.loadQueue();
    this.setupNetworkListener();
  }

  async addToQueue(operation) {
    const queueItem = {
      id: `${Date.now()}_${Math.random()}`,
      timestamp: Date.now(),
      retries: 0,
      status: 'pending',
      ...operation,
    };

    this.queue.push(queueItem);
    await this.persistQueue();
    this.notifyListeners();

    // Try to process immediately if online
    const netInfo = await NetInfo.fetch();
    if (netInfo.isConnected) {
      this.processQueue();
    }

    return queueItem.id;
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      console.log('Offline: Queue processing postponed');
      return;
    }

    this.processing = true;

    const pendingItems = this.queue.filter(
      (item) => item.status === 'pending' || item.status === 'failed'
    );

    for (const item of pendingItems) {
      try {
        await this.processItem(item);
        this.removeFromQueue(item.id);
      } catch (error) {
        await this.handleItemError(item, error);
      }
    }

    await this.persistQueue();
    this.processing = false;
    this.notifyListeners();
  }

  async processItem(item) {
    const { type, method, url, data, headers } = item;

    console.log(`Processing sync item: ${type} ${method} ${url}`);

    const response = await client.request({
      method,
      url,
      data,
      headers,
    });

    item.status = 'completed';
    item.completedAt = Date.now();
    item.response = response.data;

    return response.data;
  }

  async handleItemError(item, error) {
    item.retries++;
    item.lastError = error.message;

    if (item.retries >= 3) {
      item.status = 'failed';
      console.error(`Sync item failed after 3 retries:`, item);
    } else {
      item.status = 'pending';
      console.warn(`Sync item retry ${item.retries}/3:`, item);
    }
  }

  removeFromQueue(itemId) {
    this.queue = this.queue.filter((item) => item.id !== itemId);
  }

  async clearCompleted() {
    this.queue = this.queue.filter((item) => item.status !== 'completed');
    await this.persistQueue();
    this.notifyListeners();
  }

  async clearFailed() {
    this.queue = this.queue.filter((item) => item.status !== 'failed');
    await this.persistQueue();
    this.notifyListeners();
  }

  async retryFailed() {
    this.queue.forEach((item) => {
      if (item.status === 'failed') {
        item.status = 'pending';
        item.retries = 0;
      }
    });
    await this.persistQueue();
    this.processQueue();
  }

  getPendingCount() {
    return this.queue.filter(
      (item) => item.status === 'pending' || item.status === 'failed'
    ).length;
  }

  getFailedCount() {
    return this.queue.filter((item) => item.status === 'failed').length;
  }

  getQueue() {
    return [...this.queue];
  }

  async persistQueue() {
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(this.queue));
  }

  async loadQueue() {
    const stored = await AsyncStorage.getItem(QUEUE_KEY);
    this.queue = stored ? JSON.parse(stored) : [];
  }

  setupNetworkListener() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        console.log('Network connected: Processing sync queue');
        this.processQueue();
      }
    });
  }

  onQueueChange(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach((callback) => {
      callback({
        pending: this.getPendingCount(),
        failed: this.getFailedCount(),
        total: this.queue.length,
      });
    });
  }

  async getLastSyncTime() {
    const timestamp = await AsyncStorage.getItem(LAST_SYNC_KEY);
    return timestamp ? parseInt(timestamp, 10) : null;
  }

  async updateLastSyncTime() {
    await AsyncStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
  }
}

export default new SyncQueueService();
