import API from "./axios";

export const getCasts = () => API.get("/cast/get");
export const getCastById = (id) => API.get(`/cast/get/${id}`);
export const createCast = (data) => API.post("/cast/create", data);
export const updateCast = (id, data) => API.put(`/cast/update/${id}`, data);
export const deleteCast = (id) => API.delete(`/cast/delete/${id}`);