import React from 'react';
import { useBooks } from '../contexts/BookContext';
import { Grid, Container, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import BookCard from '../components/BookCard';
import FilterPanel from '../components/FilterPanel';
import { useNavigate } from 'react-router-dom';

const BookListPage: React.FC = () => {
  const { filteredBooks, loading, error } = useBooks();
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/books/${id}`);
  };

  if (loading && filteredBooks.length === 0) {
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

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{xs: 12, md: 3}} >
          <Paper elevation={3}>
            <FilterPanel />
          </Paper>
        </Grid>
        <Grid size={{xs: 12, md: 9}} >
          <Typography variant="h4" component="h1" gutterBottom>
            Discover Books
          </Typography>
          {filteredBooks.length === 0 ? (
            <Typography variant="body1">No books found matching your criteria.</Typography>
          ) : (
            <Grid container spacing={3}>
              {filteredBooks.map((book) => (
                <Grid size={{ xs:2, sm:6, md:4, lg:3 }} >
                  <BookCard book={book} onViewDetails={handleViewDetails} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookListPage;
