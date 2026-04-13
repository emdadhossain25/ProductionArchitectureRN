import syncQueueService from './syncQueue.service';
import { ConflictResolver, ConflictStrategy } from './conflictResolution';

class SyncService {
  async initialize() {
    await syncQueueService.initialize();
  }

  async createPost(postData) {
    const queueId = await syncQueueService.addToQueue({
      type: 'CREATE_POST',
      method: 'POST',
      url: '/posts',
      data: postData,
    });

    return { queueId, localData: postData };
  }

  async updatePost(postId, updates) {
    const queueId = await syncQueueService.addToQueue({
      type: 'UPDATE_POST',
      method: 'PUT',
      url: `/posts/${postId}`,
      data: updates,
    });

    return { queueId, localData: updates };
  }

  async deletePost(postId) {
    const queueId = await syncQueueService.addToQueue({
      type: 'DELETE_POST',
      method: 'DELETE',
      url: `/posts/${postId}`,
    });

    return { queueId };
  }

  async syncData() {
    await syncQueueService.processQueue();
    await syncQueueService.updateLastSyncTime();
  }

  async resolveConflict(localData, serverData, strategy) {
    return ConflictResolver.resolve(localData, serverData, strategy);
  }

  getPendingSync() {
    return syncQueueService.getPendingCount();
  }

  getFailedSync() {
    return syncQueueService.getFailedCount();
  }

  onSyncChange(callback) {
    return syncQueueService.onQueueChange(callback);
  }

  async retryFailed() {
    await syncQueueService.retryFailed();
  }

  async clearFailed() {
    await syncQueueService.clearFailed();
  }
}

export default new SyncService();
