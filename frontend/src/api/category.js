import API from "./axios";

export const getCategories = () => API.get("/category/get");
export const getCategoryById = (id) => API.get(`/category/get/${id}`);
export const createCategory = (data) => API.post("/category/create", data);
export const updateCategory = (id, data) => API.put(`/category/update/${id}`, data);
export const deleteCategory = (id) => API.delete(`/category/delete/${id}`);