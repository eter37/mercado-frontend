import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const getAll = () => axios.get(`${API}/products`);
export const getById = (id) => axios.get(`${API}/products/${id}`);
export const create = (data) => axios.post(`${API}/products`, data);
export const update = (id, data) => axios.put(`${API}/products/${id}`, data);
export const remove = (id) => axios.delete(`${API}/products/${id}`);