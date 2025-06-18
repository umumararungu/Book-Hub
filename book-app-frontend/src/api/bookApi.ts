import type { Book } from '../types/book';

const API_BASE_URL = 'http://localhost:5000/api/books';

// Generic function to handle fetch errors
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! Status: ${response.status}`
    );
  }
  return response.json();
};

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(API_BASE_URL);
    return handleResponse<Book[]>(response);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch books');
  }
};

export const fetchBookById = async (id: string): Promise<Book> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return handleResponse<Book>(response);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Failed to fetch book');
  }
};