import React from 'react';
import type { Book } from '../../types/book';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img 
        src={book.coverImage} 
        alt={book.title} 
        className={styles.cardImage} 
      />
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>{book.author}</p>
    </div>
  );
};

export default BookCard;