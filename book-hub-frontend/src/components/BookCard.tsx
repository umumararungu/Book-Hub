import React from 'react';
import { Book } from '../types/book';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Rating } from '@mui/material';

interface BookCardProps {
  book: Book;
  onViewDetails: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={book.coverImage || '/placeholder-book-cover.png'}
        alt={book.title}
        sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {book.genres.join(', ')}
        </Typography>
        {book.rating && (
          <Rating value={book.rating} precision={0.5} readOnly sx={{ mt: 1 }} />
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onViewDetails(book._id)}>View Details</Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
