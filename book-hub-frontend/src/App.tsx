import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './contexts/BookContext';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
          </Routes>
        </Router>
      </BookProvider>
    </ThemeProvider>
  );
};

export default App;