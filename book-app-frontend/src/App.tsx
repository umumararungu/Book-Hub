import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;