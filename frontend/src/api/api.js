import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // ✅ FIXED (ADD /api HERE)
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= AUTH =================
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ================= USER =================

export const getUserById = (id) =>
  API.get(`/user/get/${id}`);

export const updateUserById = (id, data) =>
  API.put(`/user/update/${id}`, data);

// ================= CAST =================
export const createCast = (data) =>
  API.post("/cast/create", data);

export const getCasts = (page = 1) =>
  API.get(`/cast/get?page=${page}`);

export const getCastById = (id) =>
  API.get(`/cast/get/${id}`);

export const updateCast = (id, data) =>
  API.put(`/cast/update/${id}`, data);

export const deleteCast = (id) =>
  API.delete(`/cast/delete/${id}`);

// ================= CATEGORY =================
export const createCategory = (data) =>
  API.post("/category/create", data);

export const getCategoryById = (id) =>
  API.get(`/category/get/${id}`);

export const getCategories = (page = 1, search = "") =>
  API.get(`/category/get?page=${page}&search=${search}`);

export const updateCategory = (id, data) =>
  API.put(`/category/update/${id}`, data);

export const deleteCategory = (id) =>
  API.delete(`/category/delete/${id}`);

// ================= MOVIE =================
export const createMovie = (data) =>
  API.post("/movie/create", data);

export const getMovies = (page = 1, search = "") =>
  API.get(`/movie/get?page=${page}&search=${search}`);

export const getMovieById = (id) =>
  API.get(`/movie/get/${id}`);

export const updateMovie = (id, data) =>
  API.put(`/movie/update/${id}`, data);

export const deleteMovie = (id) =>
  API.delete(`/movie/delete/${id}`);

// Movies by category
export const getMoviesByCategory = (categoryId, page = 1, search = "") =>
  API.get(`/movie/get`, {
    params: { category: categoryId, page, search },
  });

// ================= HISTORY =================
export const watchMovie = (movieId, data) =>
  API.post(`/history/watch/${movieId}`, data);

export const getHistory = (userId, page = 1, search = "") =>
  API.get(`/history/get/${userId}`, {
    params: { page, search },
  });

// ================= DOWNLOAD =================
export const downloadMovie = (movieId, data) =>
  API.post(`/download/download/${movieId}`, data);

export const getUserDownloads = (userId, page = 1, search = "") =>
  API.get(`/download/${userId}?page=${page}&search=${search}`);