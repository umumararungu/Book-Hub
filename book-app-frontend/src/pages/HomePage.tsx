import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setError, setLoading } from '../features/books/booksSlice';
import BookList from '../components/BookList/BookList';
import SearchBar from '../components/SearchBar/SearchBar';
import styles from './HomePage.module.css';
import { loadBooks } from '../features/books/booksSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(loadBooks());
      } catch (err) {
        dispatch(setError('Failed to fetch books from API'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchBooks();
  }, [dispatch]);

  if (loading) return <div className={styles.loading}>Loading books...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Collection</h1>
      <SearchBar />
      <BookList /> {/* No props needed */}
    </div>
  );
};

export default HomePage;