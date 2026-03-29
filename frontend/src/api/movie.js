import API from "./axios";

export const getMovies = (page = 1) =>
  API.get(`/movie/get?page=${page}`);

export const getMovieById = (id) =>
  API.get(`/movie/get/${id}`);