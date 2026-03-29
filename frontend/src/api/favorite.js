import API from "./axios";

export const addFavorite = (data) =>
  API.post("/favorite/create", data);