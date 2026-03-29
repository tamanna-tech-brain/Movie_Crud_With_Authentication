import API from "./axios";

export const getProfile = (id) =>
  API.get(`/user/get/${id}`);

export const updateProfile = (id, data) =>
  API.put(`/user/update/${id}`, data);