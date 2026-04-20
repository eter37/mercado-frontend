import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const getAll = () => axios.get(`${API}/sales`);
export const getById = (id) => axios.get(`${API}/sales/${id}`);
export const create = (data) => axios.post(`${API}/sales`, data);
export const update = (id, data) => axios.put(`${API}/sales/${id}`, data);
export const remove = (id) => axios.delete(`${API}/sales/${id}`);