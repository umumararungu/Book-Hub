import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchBooks = async (filters: any) => {
  const response = await axios.get(`${API_BASE_URL}/books`, { params: filters });
  return response.data;
};

export const fetchBookDetails = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/books/${id}`);
  return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${API_BASE_URL}/meta/genres`);
  return response.data;
};

export const fetchAuthors = async () => {
  const response = await axios.get(`${API_BASE_URL}/meta/authors`);
  return response.data;
};
