import API from "./axios";

export const downloadMovie = (movieId, userId) =>
  API.post(`/download/download/${movieId}`, { userId });