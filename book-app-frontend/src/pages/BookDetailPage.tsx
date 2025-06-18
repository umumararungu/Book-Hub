import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Button from '@mui/material/Button';
import styles from './BookDetailPage.module.css';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const book = useSelector((state: RootState) => 
    state.books.books.find(book => book.id === id)
  );

  if (!book) {
    return <div className={styles.notFound}>Book not found</div>;
  }

  return (
    <div className={styles.container}>
      <Button 
        variant="contained" 
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        Back to List
      </Button>
      
      <div className={styles.bookDetail}>
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className={styles.coverImage}
        />
        <div className={styles.details}>
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          <p className={styles.description}>{book.description}</p>
          <p>Published: {new Date(book.publicationDate).toLocaleDateString()}</p>
          {book.rating && <p>Rating: {book.rating}/5</p>}
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;