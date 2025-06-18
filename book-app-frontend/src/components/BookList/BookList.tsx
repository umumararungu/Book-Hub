import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import BookCard from '../BookCard/BookCard';
import styles from './BookList.module.css';

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);

  return (
    <div className={styles.listContainer}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={function (): void {
          throw new Error('Function not implemented.');
        } } />
      ))}
    </div>
  );
};

export default BookList;