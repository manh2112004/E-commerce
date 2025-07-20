import { get } from "../utils/request";
export const Category = async () => {
  const result = await get("categories");
  return result;
};
export const Products = async () => {
  const result = await get("products");
  return result;
};
export const productDetails = async (id) => {
  const result = await get(`products/${id}`);
  return result;
};
export const Reviews = async () => {
  const result = await get("reviews");
  return result;
};
export const categoryDetails = async (id) => {
  const result = await get(`products?categoryId=${id}`);
  return result;
};
export const searchProducts = async (keyword) => {
  const encoded = encodeURIComponent(keyword);
  const result = await get(`products?name=${encoded}`);
  return result;
};
export const login = async (userName, password) => {
  const result = await get(`users?username=${userName}&password=${password}`);
  return result;
};
