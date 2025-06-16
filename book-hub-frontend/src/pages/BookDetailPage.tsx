import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookDetails } from '../services/api';
import type { Book } from '../types/book';
import { Container, Typography, Paper, Rating, Box, Button, CircularProgress, Alert, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBookDetails = async () => {
      try {
        setLoading(true);
        const bookData = await fetchBookDetails(id!);
        setBook(bookData);
      } catch (err) {
        setError('Failed to fetch book details');
      } finally {
        setLoading(false);
      }
    };
    loadBookDetails();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Book not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to List
      </Button>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>

         <Grid size={{xs: 12, md: 4}} >
            <Box
              component="img"
              src={book.coverImage || '/placeholder-book-cover.png'}
              alt={book.title}
              sx={{ width: '100%', maxHeight: 400, objectFit: 'contain', backgroundColor: '#f5f5f5' }}
            />
          </Grid> 

          <Grid size={{xs: 12, md: 8}} >
            
            <Typography variant="h3" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              by {book.author}
            </Typography>
            {book.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={book.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  {book.rating.toFixed(1)}
                </Typography>
              </Box>
            )}
            <Typography variant="subtitle1" gutterBottom>
              Published: {new Date(book.publicationDate).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Publisher: {book.publisher}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Pages: {book.pageCount}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" paragraph>
                {book.description}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Genres:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {book.genres.map((genre) => (
                  <Chip key={genre} label={genre} size="small" />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookDetailPage;
