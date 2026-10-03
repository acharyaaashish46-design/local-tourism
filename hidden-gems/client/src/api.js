import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 8000,
});

export const getCategories = () => api.get('/categories').then((r) => r.data);
export const getPlaces = (category) =>
  api.get('/places', { params: category ? { category } : {} }).then((r) => r.data);
export const getPlace = (id) => api.get(`/places/${id}`).then((r) => r.data);
export const getItineraries = () => api.get('/itineraries').then((r) => r.data);
export const matchItinerary = (payload) =>
  api.post('/itinerary/match', payload).then((r) => r.data);

export default api;
