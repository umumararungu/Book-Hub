import express from 'express';
import Book from '../models/Book';

const router = express.Router();

// Get all genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genres');
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres' });
  }
});

// Get all authors
router.get('/authors', async (req, res) => {
  try {
    const authors = await Book.distinct('author');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors' });
  }
});

export default router;
