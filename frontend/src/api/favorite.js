import API from "./axios";

export const addFavorite = (movieId, userId) =>
  API.post("/favorite", { movieId, userId });