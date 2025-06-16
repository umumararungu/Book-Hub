import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Book, FilterOptions } from '../types/book';
import { fetchBooks, fetchGenres, fetchAuthors } from '../services/api';

interface BookContextType {
  books: Book[];
  filteredBooks: Book[];
  genres: string[];
  authors: string[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  applyFilters: (newFilters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    genres: [],
    authors: [],
    minDate: '',
    maxDate: '',
    sortBy: 'title',
    sortOrder: 'asc'
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [booksData, genresData, authorsData] = await Promise.all([
          fetchBooks({}),
          fetchGenres(),
          fetchAuthors()
        ]);
        setBooks(booksData);
        setFilteredBooks(booksData);
        setGenres(genresData);
        setAuthors(authorsData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const applyCurrentFilters = async () => {
      try {
        setLoading(true);
        const filteredData = await fetchBooks({
          search: filters.searchQuery,
          genres: filters.genres.join(','),
          author: filters.authors.join(','),
          minDate: filters.minDate,
          maxDate: filters.maxDate,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder
        });
        setFilteredBooks(filteredData);
      } catch (err) {
        setError('Failed to apply filters');
      } finally {
        setLoading(false);
      }
    };
    applyCurrentFilters();
  }, [filters]);

  const applyFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      genres: [],
      authors: [],
      minDate: '',
      maxDate: '',
      sortBy: 'title',
      sortOrder: 'asc'
    });
  };

  return (
    <BookContext.Provider value={{
      books,
      filteredBooks,
      genres,
      authors,
      loading,
      error,
      filters,
      applyFilters,
      resetFilters
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};