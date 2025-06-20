import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store';
import BookCard from '../BookCard/BookCard';
import styles from './BookList.module.css';

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => {
    console.log('Current books in store:', state.books.books);
    return state.books.books;
  });
  const navigate = useNavigate();

  const handleBookClick = (id: string) => {
    // Navigate to the book detail page with the book ID
    navigate(`/books/${id}`);
  };

  return (
    <div className={styles.bookGrid}>
      {books.map((book) => (
        <BookCard 
          key={book._id} 
          book={book} 
          onClick={() => handleBookClick(book._id)} 
        />
      ))}
    </div>
  );
};

export default BookList;