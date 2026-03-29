import API from "./axios";

export const getHistory = (userId) =>
  API.get(`/history/get/${userId}`);

export const watchMovie = (movieId, userId) =>
  API.post(`/history/watch/${movieId}`, { userId });