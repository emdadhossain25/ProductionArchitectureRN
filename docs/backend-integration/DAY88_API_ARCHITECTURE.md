# Day 88: Backend Integration Architecture

## API Strategy Overview

Production apps need robust backend integration for authentication, data sync, real-time updates, and business logic.

Current state:
- API client configured (axios with interceptors)
- Environment-based URLs ready
- Error handling in place
- Offline support prepared

Next step: Design complete backend integration architecture.

## RESTful API Design

### Base Structure

Endpoints organized by resource:
Authentication:
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
Users:
GET    /api/v1/users
GET    /api/v1/users/:id
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
POST   /api/v1/users/:id/avatar
Posts/Content:
GET    /api/v1/posts
POST   /api/v1/posts
GET    /api/v1/posts/:id
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id
POST   /api/v1/posts/:id/like
Settings:
GET    /api/v1/settings
PUT    /api/v1/settings

### Request/Response Format

Standard request structure:
```javascript
{
  "data": {
    // Request payload
  },
  "metadata": {
    "requestId": "uuid-here",
    "timestamp": "2024-04-09T12:00:00Z"
  }
}
```

Standard response structure:
```javascript
{
  "success": true,
  "data": {
    // Response payload
  },
  "metadata": {
    "requestId": "uuid-here",
    "timestamp": "2024-04-09T12:00:00Z",
    "version": "1.0.0"
  }
}
```

Error response structure:
```javascript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  },
  "metadata": {
    "requestId": "uuid-here",
    "timestamp": "2024-04-09T12:00:00Z"
  }
}
```

## Authentication Strategy

### JWT Token-Based Authentication

Flow:

User logs in with credentials
Server validates and returns JWT tokens
Client stores access token (short-lived: 15 min)
Client stores refresh token (long-lived: 7 days)
Access token sent with each request
When access token expires, use refresh token
Get new access token automatically
Logout invalidates both tokens


Implementation structure:
```javascript
// Auth tokens storage
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": 1712656800000,
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

Token refresh logic:
```javascript
// Axios interceptor checks token expiry
// Automatically refreshes before request
// Retries original request with new token
// Logs out if refresh fails
```

### Biometric Authentication Integration

Flow:

User enables biometric login in settings
Store encrypted credentials securely
On app launch, offer biometric prompt
If successful, retrieve credentials
Auto-login with stored credentials
Get fresh tokens from server


Security considerations:

Never store plain passwords
Use device keychain/keystore
Biometric only unlocks stored token
Re-authenticate periodically (7 days)
Clear on logout or device change


## Data Synchronization

### Offline-First Sync Strategy

Three-way sync approach:

Local changes queue:
```javascript
{
  "pendingChanges": [
    {
      "id": "change-1",
      "type": "CREATE",
      "resource": "posts",
      "data": {...},
      "timestamp": 1712656800000
    },
    {
      "id": "change-2",
      "type": "UPDATE",
      "resource": "users/123",
      "data": {...},
      "timestamp": 1712656900000
    }
  ]
}
```

Sync process:

App goes online
Fetch server changes since last sync
Apply server changes locally
Send local changes to server
Resolve conflicts if any
Update last sync timestamp


Conflict resolution:
Strategy 1: Server wins (default)

Discard local change
Keep server version
Notify user of conflict

Strategy 2: Last write wins

Compare timestamps
Keep most recent
Merge if possible

Strategy 3: Manual resolution

Show both versions to user
Let user choose or merge
Applied to critical data


### Real-Time Updates

WebSocket connection for live data:

```javascript
// Connection lifecycle
1. Connect on app foreground
2. Subscribe to user-specific channel
3. Receive real-time updates
4. Update local state immediately
5. Disconnect on app background
6. Reconnect with exponential backoff
```

Event types:
```javascript
{
  "type": "MESSAGE_RECEIVED",
  "data": {
    "id": "msg-123",
    "from": "user-456",
    "content": "Hello",
    "timestamp": 1712656800000
  }
}

{
  "type": "POST_LIKED",
  "data": {
    "postId": "post-789",
    "userId": "user-101",
    "likeCount": 42
  }
}

{
  "type": "USER_ONLINE",
  "data": {
    "userId": "user-202",
    "status": "online"
  }
}
```

## API Service Layer

### Service Organization
src/services/api/
├── client.js              # Axios instance
├── interceptors.js        # Request/response handling
├── auth.service.js        # Authentication endpoints
├── user.service.js        # User management
├── post.service.js        # Content endpoints
├── settings.service.js    # App settings sync
└── sync.service.js        # Offline sync logic

### Auth Service Example

```javascript
// src/services/api/auth.service.js
import client from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  async login(email, password) {
    const response = await client.post('/auth/login', {
      email,
      password,
    });
    
    await this.storeTokens(response.data);
    return response.data.user;
  }

  async register(userData) {
    const response = await client.post('/auth/register', userData);
    await this.storeTokens(response.data);
    return response.data.user;
  }

  async logout() {
    await client.post('/auth/logout');
    await this.clearTokens();
  }

  async refreshToken() {
    const refreshToken = await this.getRefreshToken();
    const response = await client.post('/auth/refresh', {
      refreshToken,
    });
    await this.storeTokens(response.data);
    return response.data.accessToken;
  }

  async storeTokens(data) {
    await AsyncStorage.multiSet([
      ['@access_token', data.accessToken],
      ['@refresh_token', data.refreshToken],
      ['@token_expiry', String(data.expiresAt)],
    ]);
  }

  async getAccessToken() {
    return await AsyncStorage.getItem('@access_token');
  }

  async getRefreshToken() {
    return await AsyncStorage.getItem('@refresh_token');
  }

  async clearTokens() {
    await AsyncStorage.multiRemove([
      '@access_token',
      '@refresh_token',
      '@token_expiry',
    ]);
  }

  async isTokenExpired() {
    const expiry = await AsyncStorage.getItem('@token_expiry');
    return Date.now() >= parseInt(expiry);
  }
}

export default new AuthService();
```

### User Service Example

```javascript
// src/services/api/user.service.js
import client from './client';

class UserService {
  async getProfile() {
    const response = await client.get('/users/me');
    return response.data;
  }

  async updateProfile(updates) {
    const response = await client.put('/users/me', updates);
    return response.data;
  }

  async uploadAvatar(imageUri) {
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });

    const response = await client.post('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }

  async deleteAccount() {
    await client.delete('/users/me');
  }
}

export default new UserService();
```

## Request Queue for Offline Support

### Queue Implementation

```javascript
// src/services/api/requestQueue.js
class RequestQueue {
  constructor() {
    this.queue = [];
  }

  async add(request) {
    this.queue.push({
      id: Date.now().toString(),
      ...request,
      timestamp: Date.now(),
      retries: 0,
    });
    await this.persist();
  }

  async processQueue() {
    if (!navigator.onLine) return;

    const pending = [...this.queue];
    
    for (const request of pending) {
      try {
        await this.executeRequest(request);
        this.remove(request.id);
      } catch (error) {
        request.retries++;
        if (request.retries > 3) {
          // Move to failed queue or discard
          this.remove(request.id);
        }
      }
    }
    
    await this.persist();
  }

  async executeRequest(request) {
    const { method, url, data, headers } = request;
    return await client.request({
      method,
      url,
      data,
      headers,
    });
  }

  remove(id) {
    this.queue = this.queue.filter(r => r.id !== id);
  }

  async persist() {
    await AsyncStorage.setItem(
      '@request_queue',
      JSON.stringify(this.queue)
    );
  }

  async restore() {
    const stored = await AsyncStorage.getItem('@request_queue');
    this.queue = stored ? JSON.parse(stored) : [];
  }
}

export default new RequestQueue();
```

## API Performance Optimization

### Caching Strategy

Response caching:
```javascript
// Cache GET requests for 5 minutes
const cache = new Map();

async function cachedGet(url, maxAge = 300000) {
  const cached = cache.get(url);
  
  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.data;
  }
  
  const response = await client.get(url);
  cache.set(url, {
    data: response.data,
    timestamp: Date.now(),
  });
  
  return response.data;
}
```

Request deduplication:
```javascript
// Prevent duplicate simultaneous requests
const pending = new Map();

async function deduplicatedRequest(key, requestFn) {
  if (pending.has(key)) {
    return pending.get(key);
  }
  
  const promise = requestFn();
  pending.set(key, promise);
  
  try {
    const result = await promise;
    return result;
  } finally {
    pending.delete(key);
  }
}
```

### Pagination

Cursor-based pagination:
```javascript
async function fetchPosts(cursor = null, limit = 20) {
  const response = await client.get('/posts', {
    params: { cursor, limit },
  });
  
  return {
    posts: response.data.posts,
    nextCursor: response.data.nextCursor,
    hasMore: response.data.hasMore,
  };
}
```

Infinite scroll integration:
```javascript
// React Native FlatList
const [posts, setPosts] = useState([]);
const [cursor, setCursor] = useState(null);
const [loading, setLoading] = useState(false);

const loadMore = async () => {
  if (loading) return;
  
  setLoading(true);
  const { posts: newPosts, nextCursor } = await fetchPosts(cursor);
  setPosts([...posts, ...newPosts]);
  setCursor(nextCursor);
  setLoading(false);
};
```

## Error Handling

### Retry Logic

```javascript
async function requestWithRetry(requestFn, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry 4xx errors (client errors)
      if (error.response?.status < 500) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
  
  throw lastError;
}
```

### Network Status Monitoring

```javascript
import NetInfo from '@react-native-community/netinfo';

NetInfo.addEventListener(state => {
  if (state.isConnected) {
    // Process queued requests
    requestQueue.processQueue();
    
    // Sync data
    syncService.sync();
    
    // Reconnect WebSocket
    websocket.connect();
  }
});
```

## Security Considerations

### HTTPS Only

```javascript
// Enforce HTTPS in production
if (!__DEV__ && !url.startsWith('https://')) {
  throw new Error('HTTPS required in production');
}
```

### Certificate Pinning

```javascript
// iOS: Add public key hashes to Info.plist
// Android: Add network security config
// React Native: Use react-native-ssl-pinning
```

### Data Encryption

```javascript
// Encrypt sensitive data before storage
import CryptoJS from 'crypto-js';

function encrypt(data, key) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    key
  ).toString();
}

function decrypt(encrypted, key) {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
```

## Key Takeaways

1. RESTful API with consistent structure
2. JWT token authentication with refresh
3. Offline-first with sync queue
4. Real-time updates via WebSocket
5. Service layer organization
6. Request caching and deduplication
7. Proper error handling and retries
8. Network status monitoring
9. Security best practices
10. Performance optimization built-in

Tomorrow: Backend Integration Implementation

