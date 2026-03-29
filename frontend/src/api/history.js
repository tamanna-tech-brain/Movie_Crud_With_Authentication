import API from "./axios";

export const getHistory = (userId, page = 1) => {
  return API.get(`/history/get/${userId}?page=${page}`);
};