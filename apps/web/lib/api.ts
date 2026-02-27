import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = axios.create({
  baseURL: `${API_BASE}/api/v3`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error("Rate limited");
    }
    return Promise.reject(error);
  }
);

// Player API
export const playerApi = {
  get: (username: string) => api.get(`/player/${username}`),
  getCharacters: (username: string) => api.get(`/player/${username}/characters`),
  getCharacter: (username: string, charUuid: string) =>
    api.get(`/player/${username}/characters/${charUuid}`),
  getOnline: () => api.get("/player/online"),
};

// Guild API
export const guildApi = {
  get: (guildName: string) => api.get(`/guild/${guildName}`),
  getByPrefix: (prefix: string) => api.get(`/guild/prefix/${prefix}`),
  list: () => api.get("/guild"),
  getTerritories: () => api.get("/guild/territory"),
};

// Leaderboard API
export const leaderboardApi = {
  get: (type: string, limit?: number) =>
    api.get(`/leaderboard/${type}`, { params: { resultLimit: limit } }),
  getTypes: () => api.get("/leaderboard/types"),
};

// Item API
export const itemApi = {
  list: () => api.get("/item"),
  get: (name: string) => api.get(`/item/${encodeURIComponent(name)}`),
};

// Search API
export const searchApi = {
  search: (query: string) => api.get(`/search/${encodeURIComponent(query)}`),
};

// Map API
export const mapApi = {
  getMarkers: () => api.get("/map/locations/markers"),
};

// News API
export const newsApi = {
  list: () => api.get("/news"),
  get: (slug: string) => api.get(`/news/${slug}`),
};

// Server API
export const serverApi = {
  getStatus: () => api.get("/server/status"),
};

// Classes API
export const classApi = {
  list: () => api.get("/classes"),
};

// Auth API (internal Next.js routes)
export const authApi = {
  login: (data: { email: string; password: string }) =>
    axios.post("/api/auth/login", data),
  register: (data: { email: string; password: string; minecraftName: string }) =>
    axios.post("/api/auth/register", data),
  logout: () => axios.post("/api/auth/logout"),
  me: () => axios.get("/api/auth/me"),
};

// Store API (internal Next.js routes)
export const storeApi = {
  getProducts: (category?: string) =>
    axios.get("/api/store/products", { params: { category } }),
  createCheckout: (data: unknown) => axios.post("/api/store/checkout", data),
  getPurchases: () => axios.get("/api/store/purchases"),
};

// Forums API (internal Next.js routes)
export const forumsApi = {
  getCategories: () => axios.get("/api/forums/categories"),
  getThreads: (categorySlug: string, page?: number) =>
    axios.get(`/api/forums/threads`, { params: { category: categorySlug, page } }),
  getThread: (threadId: string, page?: number) =>
    axios.get(`/api/forums/threads/${threadId}`, { params: { page } }),
  createThread: (data: unknown) => axios.post("/api/forums/threads", data),
  createPost: (threadId: string, data: unknown) =>
    axios.post(`/api/forums/threads/${threadId}/posts`, data),
  react: (postId: string, reactionType: string) =>
    axios.post(`/api/forums/posts/${postId}/react`, { type: reactionType }),
};
