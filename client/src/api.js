import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '', timeout: 10000 });
export const getCategories = async () => (await api.get('/api/categories')).data;
export const getPlaces = async (category) => (await api.get('/api/places', { params: category ? { category } : {} })).data;
export const getPlace = async (id) => (await api.get(`/api/places/${encodeURIComponent(id)}`)).data;
export const matchItinerary = async (payload) => (await api.post('/api/itinerary/match', payload)).data;
export default api;
