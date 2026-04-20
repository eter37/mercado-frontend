import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const getAll = () => axios.get(`${API}/providers`);
export const getById = (id) => axios.get(`${API}/providers/${id}`);
export const create = (data) => axios.post(`${API}/providers`, data);
export const update = (id, data) => axios.put(`${API}/providers/${id}`, data);
export const remove = (id) => axios.delete(`${API}/providers/${id}`);