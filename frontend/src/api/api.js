import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// AUTH
export const registerUser = (data) => API.post("/api/auth/register", data);
export const loginUser = (data) => API.post("/api/auth/login", data);

// USER
export const getUserById = (id) => API.get(`/api/user/get/${id}`);
export const updateUserById = (id, data) => API.put(`/api/user/update/${id}`, data);

// CAST
export const createCast = (data) => API.post("/api/cast/create", data);
export const getCasts = (page = 1) => API.get(`/api/cast/get?page=${page}`);
export const getCastById = (id) => API.get(`/api/cast/get/${id}`);
export const updateCast = (id, data) => API.put(`/api/cast/update/${id}`, data);
export const deleteCast = (id) => API.delete(`/api/cast/delete/${id}`);

// CATEGORY
export const createCategory = (data) => API.post("/api/category/create", data);
export const getCategories = (page = 1) => API.get(`/api/category/get?page=${page}`);
export const getCategoryById = (id) => API.get(`/api/category/get/${id}`);
export const updateCategory = (id, data) => API.put(`/api/category/update/${id}`, data);
export const deleteCategory = (id) => API.delete(`/api/category/delete/${id}`);

// MOVIE
export const createMovie = (data) => API.post("/api/movie/create", data);
export const getMovies = (page = 1) => API.get(`/api/movie/get?page=${page}`);
export const getMovieById = (id) => API.get(`/api/movie/get/${id}`);
export const updateMovie = (id, data) => API.put(`/api/movie/update/${id}`, data);
export const deleteMovie = (id) => API.delete(`/api/movie/delete/${id}`);

export const watchMovie = (movieId, data) =>
  API.post(`/api/history/watch/${movieId}`, data);

export const getHistory = (userId) =>
  API.get(`/api/history/get/${userId}`);

export const downloadMovie = (movieId, data) =>
  API.post(`/api/download/download/${movieId}`, data);

export const getDownloads = (userId) =>
  API.get(`/api/download/get/${userId}`);