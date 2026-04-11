import client from './client';

class ContentService {
  async getPosts(cursor = null, limit = 20) {
    const response = await client.get('/posts', {
      params: { cursor, limit },
    });

    return {
      posts: response.data.posts,
      nextCursor: response.data.nextCursor,
      hasMore: response.data.hasMore,
    };
  }

  async getPostById(postId) {
    const response = await client.get(`/posts/${postId}`);
    return response.data;
  }

  async createPost(postData) {
    const response = await client.post('/posts', postData);
    return response.data;
  }

  async updatePost(postId, updates) {
    const response = await client.put(`/posts/${postId}`, updates);
    return response.data;
  }

  async deletePost(postId) {
    await client.delete(`/posts/${postId}`);
  }

  async likePost(postId) {
    const response = await client.post(`/posts/${postId}/like`);
    return response.data;
  }

  async unlikePost(postId) {
    const response = await client.delete(`/posts/${postId}/like`);
    return response.data;
  }

  async getComments(postId, cursor = null, limit = 20) {
    const response = await client.get(`/posts/${postId}/comments`, {
      params: { cursor, limit },
    });

    return {
      comments: response.data.comments,
      nextCursor: response.data.nextCursor,
      hasMore: response.data.hasMore,
    };
  }

  async createComment(postId, content) {
    const response = await client.post(`/posts/${postId}/comments`, {
      content,
    });
    return response.data;
  }

  async deleteComment(postId, commentId) {
    await client.delete(`/posts/${postId}/comments/${commentId}`);
  }

  async uploadMedia(file) {
    const formData = new FormData();
    formData.append('media', {
      uri: file.uri,
      type: file.type || 'image/jpeg',
      name: file.name || 'upload.jpg',
    });

    const response = await client.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`Upload progress: ${percentCompleted}%`);
      },
    });

    return response.data;
  }

  async getFeed(cursor = null, limit = 20) {
    const response = await client.get('/feed', {
      params: { cursor, limit },
    });

    return {
      posts: response.data.posts,
      nextCursor: response.data.nextCursor,
      hasMore: response.data.hasMore,
    };
  }

  async searchPosts(query, cursor = null, limit = 20) {
    const response = await client.get('/posts/search', {
      params: { q: query, cursor, limit },
    });

    return {
      posts: response.data.posts,
      nextCursor: response.data.nextCursor,
      hasMore: response.data.hasMore,
    };
  }
}

export default new ContentService();
