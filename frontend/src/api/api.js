import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // change if your backend runs on different port
});

export const registerUser = (data) =>
  API.post("/api/auth/register", data);

export const loginUser = (data) =>
  API.post("/api/auth/login", data);
// ✅ Get user by ID
export const getUserById = (id) =>
  API.get(`/api/user/get/${id}`);

// ✅ Update user
export const updateUserById = (id, data) =>
  API.put(`/api/user/update/${id}`, data);
// ✅ Cast APIs
export const createCast = (data) =>
  API.post("/api/cast/create", data);

export const getCasts = (page = 1) =>
  API.get(`/api/cast/get?page=${page}`);

export const getCastById = (id) =>
  API.get(`/api/cast/get/${id}`);

export const updateCast = (id, data) =>
  API.put(`/api/cast/update/${id}`, data);

export const deleteCast = (id) =>
  API.delete(`/api/cast/delete/${id}`);

// ✅ Category APIs
export const createCategory = (data) =>
  API.post("/api/category/create", data);

export const getCategories = (page = 1) =>
  API.get(`/api/category/get?page=${page}`);

export const getCategoryById = (id) =>
  API.get(`/api/category/get/${id}`);

export const updateCategory = (id, data) =>
  API.put(`/api/category/update/${id}`, data);

export const deleteCategory = (id) =>
  API.delete(`/api/category/delete/${id}`);
// ✅ Get all movies
export const getMovies = () => API.get("/get");

// ✅ Get movie by ID
export const getMovieById = (id) => API.get(`/get/${id}`);

// ✅ Create movie
export const createMovie = (data) => API.post("/create", data);

// ✅ Update movie
export const updateMovie = (id, data) =>
  API.put(`/update/${id}`, data);

// ✅ Delete movie
export const deleteMovie = (id) =>
  API.delete(`/delete/${id}`);