import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const getAll = () => axios.get(`${API}/users`);
export const getById = (id) => axios.get(`${API}/users/${id}`);
export const create = (data) => axios.post(`${API}/users`, data);
export const update = (id, data) => axios.put(`${API}/users/${id}`, data);
export const remove = (id) => axios.delete(`${API}/users/${id}`);