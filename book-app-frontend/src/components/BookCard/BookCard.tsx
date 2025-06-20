// src/components/BookCard/BookCard.tsx
import React from 'react';
import type { Book } from '../../types/book';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.imageContainer}>
        <img 
          src={book.coverImage} 
          alt={`Cover of ${book.title}`} 
          className={styles.cardImage}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-book.png';
          }}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard;