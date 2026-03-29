import API from "./axios";

export const watchMovie = (movieId, userId) =>
  API.post(`/history/watch/${movieId}`, { userId });

export const getHistory = (userId, page = 1) =>
  API.get(`/history/get/${userId}?page=${page}`);