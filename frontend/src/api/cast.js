import API from "./axios";

export const getCasts = () => API.get("/cast/get");