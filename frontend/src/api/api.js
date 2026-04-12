import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// 🔓 Public API
const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Protected API
const AUTH_API = axios.create({
  baseURL: BASE_URL,
});


// ✅ REQUEST INTERCEPTOR (VERY IMPORTANT)
AUTH_API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN SENT:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

AUTH_API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN SENT:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= AUTH =================
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);


// ================= USER =================
export const getUserById = (id) =>
  API.get(`/user/get/${id}`);

export const updateUserById = (id, data) =>
  AUTH_API.put(`/user/update/${id}`, data);


// ================= CAST =================
export const createCast = (data) =>
  AUTH_API.post("/cast/create", data);

export const getCasts = () =>
  API.get(`/cast/get`);

export const getCastById = (id) =>
  API.get(`/cast/get/${id}`);

export const updateCast = (id, data) =>
  AUTH_API.put(`/cast/update/${id}`, data);

export const deleteCast = (id) =>
  AUTH_API.delete(`/cast/delete/${id}`);


// ================= CATEGORY =================
export const createCategory = (data) =>
  AUTH_API.post("/category/create", data);

export const getCategoryById = (id) =>
  API.get(`/category/get/${id}`);

export const getCategories = () =>
  API.get(`/category/get`);

export const updateCategory = (id, data) =>
  AUTH_API.put(`/category/update/${id}`, data); // ✅ FIXED

export const deleteCategory = (id) =>
  AUTH_API.delete(`/category/delete/${id}`);


// ================= MOVIE =================
export const createMovie = (data) =>
  AUTH_API.post("/movie/create", data);

export const getMovies = () =>
  API.get(`/movie/get`);

export const getMovieById = (id) =>
  API.get(`/movie/get/${id}`);

export const updateMovie = (id, data) =>
  AUTH_API.put(`/movie/update/${id}`, data);

export const deleteMovie = (id) =>
  AUTH_API.delete(`/movie/delete/${id}`);


// ================= HISTORY =================
export const watchMovie = (movieId) =>
  AUTH_API.post(`/history/watch/${movieId}`);

export const downloadMovie = (movieId) =>
  AUTH_API.post(`/downloads/${movieId}`);

 export const getDownloads = () =>
  AUTH_API.get(`/downloads`);

export const getHistory = () =>
  AUTH_API.get(`/history`);