import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_API = axios.create({
  baseURL: BASE_URL,
});

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

const handleResponse = (res) => res;

const handleError = (error) => {
  const message =
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";

  console.error("API ERROR:", message);

  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return Promise.reject({
    success: false,
    message,
    status: error.response?.status,
  });
};

API.interceptors.response.use(handleResponse, handleError);
AUTH_API.interceptors.response.use(handleResponse, handleError);

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

export const getCasts = ({ page, limit, search }) =>
  API.get(`/cast/get`, {
    params: { page, limit, search }
  });

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

export const getCategories = ({ page, limit, search }) =>
  API.get(`/category/get`, {
    params: { page, limit, search }
  });

export const updateCategory = (id, data) =>
  AUTH_API.put(`/category/update/${id}`, data); 

export const deleteCategory = (id) =>
  AUTH_API.delete(`/category/delete/${id}`);

// ================= MOVIE =================
export const createMovie = (data) =>
  AUTH_API.post("/movie/create", data);

export const getMovies = ({ page, limit, search, categoryId }) =>
  API.get(`/movie/get`, {
    params: { page, limit, search, categoryId }
  });

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

export const getDownloads = ({ page, limit, search }) =>
  AUTH_API.get(`/downloads`, {
    params: { page, limit, search }
  });

export const getHistory = ({ page, limit, search }) =>
  AUTH_API.get(`/history`, {
    params: { page, limit, search }
  });