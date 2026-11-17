import { APIRequestContext, expect } from '@playwright/test';

export interface ApiResponse<T = any> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: T;
  ok: boolean;
}

export class ApiClient {
  constructor(
    private request: APIRequestContext,
    private baseUrl: string,
    private defaultHeaders: Record<string, string> = {}
  ) {}

  private async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    options: {
      data?: unknown;
      params?: Record<string, string>;
      headers?: Record<string, string>;
      expectedStatus?: number | number[];
    } = {}
  ): Promise<ApiResponse<T>> {
    const { data, params, headers = {}, expectedStatus = [200, 201] } = options;

    const response = await this.request[method.toLowerCase()](`${this.baseUrl}${endpoint}`, {
      data,
      params,
      headers: { ...this.defaultHeaders, ...headers },
    });

    const responseData = (await response.json().catch(() => null)) as T | null;
    const validStatuses = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];

    if (!validStatuses.includes(response.status())) {
      const errorBody = responseData || await response.text().catch(() => 'No response body');
      throw new Error(
        `API Error: ${response.status()} ${response.statusText()} - ${JSON.stringify(errorBody)}`
      );
    }

    return {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      data: responseData as T,
      ok: response.ok(),
    };
  }

  async get<T>(endpoint: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('GET', endpoint, { params, headers });
  }

  async post<T>(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('POST', endpoint, { data, headers, expectedStatus: [200, 201] });
  }

  async put<T>(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('PUT', endpoint, { data, headers });
  }

  async patch<T>(endpoint: string, data: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('PATCH', endpoint, { data, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>('DELETE', endpoint, { headers, expectedStatus: [200, 204] });
  }

  // Convenience methods with just data return
  async getData<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const response = await this.get<T>(endpoint, params);
    return response.data;
  }

  async postData<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.post<T>(endpoint, data);
    return response.data;
  }

  async putData<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.put<T>(endpoint, data);
    return response.data;
  }

  async patchData<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await this.patch<T>(endpoint, data);
    return response.data;
  }

  async deleteData(endpoint: string): Promise<void> {
    await this.delete(endpoint);
  }

  // Set default headers (e.g., for auth)
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  // Clear default headers
  clearDefaultHeaders(): void {
    this.defaultHeaders = {};
  }
}

// JSONPlaceholder specific client
export class JsonPlaceholderClient extends ApiClient {
  constructor(request: APIRequestContext) {
    super(request, 'https://jsonplaceholder.typicode.com');
  }

  async getPosts(params?: Record<string, string>) {
    return this.getData<any[]>('/posts', params);
  }

  async getPost(id: number) {
    return this.getData<any>(`/posts/${id}`);
  }

  async createPost(post: { title: string; body: string; userId: number }) {
    return this.postData<any>('/posts', post);
  }

  async updatePost(id: number, post: { id: number; title: string; body: string; userId: number }) {
    return this.putData<any>(`/posts/${id}`, post);
  }

  async patchPost(id: number, partial: Partial<{ title: string; body: string; userId: number }>) {
    return this.patchData<any>(`/posts/${id}`, partial);
  }

  async deletePost(id: number) {
    return this.deleteData(`/posts/${id}`);
  }

  async getComments(postId?: number) {
    const params = postId ? { postId: postId.toString() } : undefined;
    return this.getData<any[]>('/comments', params);
  }

  async getNestedComments(postId: number) {
    return this.getData<any[]>(`/posts/${postId}/comments`);
  }

  async getResource(resource: string, id?: number) {
    const endpoint = id ? `/${resource}/${id}` : `/${resource}`;
    return this.getData<any[]>(endpoint);
  }
}

// ReqRes specific client
export class ReqResClient extends ApiClient {
  constructor(request: APIRequestContext) {
    const apiKey = process.env.REQRES_API_KEY;
    super(request, 'https://reqres.in', apiKey ? { 'x-api-key': apiKey } : {});
  }

  async getUsers(page?: number) {
    const params = page ? { page: page.toString() } : {};
    return this.getData<any>('/api/users', params);
  }

  async getUser(id: number) {
    return this.getData<any>(`/api/users/${id}`);
  }

  async createUser(user: { name: string; job: string }) {
    return this.postData<any>('/api/users', user);
  }

  async updateUser(id: number, user: { name: string; job: string }) {
    return this.putData<any>(`/api/users/${id}`, user);
  }

  async patchUser(id: number, user: Partial<{ name: string; job: string }>) {
    return this.patchData<any>(`/api/users/${id}`, user);
  }

  async deleteUser(id: number) {
    return this.deleteData(`/api/users/${id}`);
  }

  async getResources() {
    return this.getData<any>('/api/resources');
  }

  async getResource(id: number) {
    return this.getData<any>(`/api/resources/${id}`);
  }

  async register(email: string, password: string) {
    return this.postData<any>('/api/register', { email, password });
  }

  async login(email: string, password: string) {
    return this.postData<any>('/api/login', { email, password });
  }
}