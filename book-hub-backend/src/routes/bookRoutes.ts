import express from 'express';
import Book from '../models/Book';

const router = express.Router();

// Get all books with filtering
router.get('/', async (req, res) => {
  try {
    const { search, genres, author, minDate, maxDate, sortBy, sortOrder } = req.query;
    
    let query: any = {};
    
    if (search) query.title = { $regex: search, $options: 'i' };
    if (genres) query.genres = { $in: (genres as string).split(',') };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (minDate || maxDate) {
      query.publicationDate = {};
      if (minDate) query.publicationDate.$gte = new Date(minDate as string);
      if (maxDate) query.publicationDate.$lte = new Date(maxDate as string);
    }
    
    let sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy as string] = sortOrder === 'desc' ? -1 : 1;
    }
    
    const books = await Book.find(query).sort(sortOptions);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
});

export default router;
