const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('ninejan_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async register(data: { email: string; password: string; username: string; name?: string }) {
    return this.request<{ user: any; accessToken: string; refreshToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    return this.request<{ user: any; accessToken: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Users
  async getCurrentUser() {
    return this.request<any>('/users/me');
  }

  async getUser(username: string) {
    return this.request<any>(`/users/${username}`);
  }

  async updateProfile(data: any) {
    return this.request<any>('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async followUser(username: string) {
    return this.request<any>(`/users/${username}/follow`, { method: 'POST' });
  }

  async getFollowers(username: string) {
    return this.request<any[]>(`/users/${username}/followers`);
  }

  async getFollowing(username: string) {
    return this.request<any[]>(`/users/${username}/following`);
  }

  // Posts
  async getPosts(page = 1, limit = 20) {
    return this.request<any[]>(`/posts?page=${page}&limit=${limit}`);
  }

  async getPost(id: string) {
    return this.request<any>(`/posts/${id}`);
  }

  async createPost(data: FormData) {
    const token = this.getToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers,
      body: data,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  async updatePost(id: string, data: { content: string }) {
    return this.request<any>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string) {
    return this.request<any>(`/posts/${id}`, { method: 'DELETE' });
  }

  async likePost(id: string) {
    return this.request<any>(`/posts/${id}/like`, { method: 'POST' });
  }

  async getComments(postId: string) {
    return this.request<any[]>(`/posts/${postId}/comments`);
  }

  async addComment(postId: string, content: string) {
    return this.request<any>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // Feed
  async getFeed(page = 1, limit = 20) {
    return this.request<any[]>(`/feed?page=${page}&limit=${limit}`);
  }

  // Notifications
  async getNotifications(page = 1, limit = 20) {
    return this.request<any[]>(`/notifications?page=${page}&limit=${limit}`);
  }

  async markNotificationsAsRead(notificationIds?: string[]) {
    return this.request<any>('/notifications', {
      method: 'PUT',
      body: JSON.stringify({ notificationIds }),
    });
  }

  // Search
  async search(query: string) {
    return this.request<{ users: any[]; posts: any[] }>(`/search?q=${encodeURIComponent(query)}`);
  }
}

export const api = new ApiClient();

// Convenience functions
export const register = (data: { email: string; password: string; username: string; name?: string }) =>
  api.register(data);

export const login = (email: string, password: string) => api.login(email, password);

export const logout = () => api.logout();

export const getCurrentUser = () => api.getCurrentUser();

export const getUser = (username: string) => api.getUser(username);

export const updateProfile = (data: any) => api.updateProfile(data);

export const followUser = (username: string) => api.followUser(username);

export const getFollowers = (username: string) => api.getFollowers(username);

export const getFollowing = (username: string) => api.getFollowing(username);

export const getPosts = (page = 1, limit = 20) => api.getPosts(page, limit);

export const getPost = (id: string) => api.getPost(id);

export const createPost = (data: FormData) => api.createPost(data);

export const updatePost = (id: string, data: { content: string }) => api.updatePost(id, data);

export const deletePost = (id: string) => api.deletePost(id);

export const likePost = (id: string) => api.likePost(id);

export const getComments = (postId: string) => api.getComments(postId);

export const addComment = (postId: string, content: string) => api.addComment(postId, content);

export const getFeed = (page = 1, limit = 20) => api.getFeed(page, limit);

export const getNotifications = (page = 1, limit = 20) => api.getNotifications(page, limit);

export const markNotificationsAsRead = (notificationIds?: string[]) =>
  api.markNotificationsAsRead(notificationIds);

export const search = (query: string) => api.search(query);

