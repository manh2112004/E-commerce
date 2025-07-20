import { del, patch, post } from "../utils/request";

export const createProduct = async (option) => {
  const response = await post("products", option);
  return response;
};
export const createCategory = async (data) => {
  const response = await post("categories", data);
  return response;
};
export const deleteCategory = async (id) => {
  const response = await del(`categories/${id}`);
  return response;
};
export const updateCategory = async (id, options) => {
  const response = await patch(`categories/${id}`, options);
  return response;
};
export const deleteProduct = async (id) => {
  const response = await del(`products/${id}`);
  return response;
};
export const updateProduct = async (id, options) => {
  const response = await patch(`products/${id}`, options);
  return response;
};
