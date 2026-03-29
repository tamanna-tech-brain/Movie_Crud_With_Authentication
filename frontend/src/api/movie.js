import API from "./axios";

export const getMovies = (page = 1) =>
  API.get(`/movie/get?page=${page}`);

export const getMovieById = (id) =>
  API.get(`/movie/get/${id}`);

export const createMovie = (data) =>
  API.post("/movie/create", data);

export const updateMovie = (id, data) =>
  API.put(`/movie/update/${id}`, data);

export const deleteMovie = (id) =>
  API.delete(`/movie/delete/${id}`);