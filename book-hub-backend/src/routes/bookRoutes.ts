import express from 'express';
import Book from '../models/Book';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management endpoints
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with optional filtering
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by book title
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Comma-separated list of genres to filter by
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by author name
 *       - in: query
 *         name: minDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Minimum publication date (YYYY-MM-DD)
 *       - in: query
 *         name: maxDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Maximum publication date (YYYY-MM-DD)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, author, publicationDate, rating]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - description
 *         - coverImage
 *         - genres
 *         - publicationDate
 *         - pageCount
 *         - publisher
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         description:
 *           type: string
 *           description: The book description
 *         coverImage:
 *           type: string
 *           description: URL of the book cover image
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *           description: List of genres
 *         publicationDate:
 *           type: string
 *           format: date
 *           description: Publication date
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: Average rating (optional)
 *         pageCount:
 *           type: integer
 *           description: Number of pages
 *         publisher:
 *           type: string
 *           description: Publisher name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         title: The Great Gatsby
 *         author: F. Scott Fitzgerald
 *         description: A story of wealth, love, and the American Dream in the 1920s.
 *         coverImage: https://example.com/great-gatsby.jpg
 *         genres: ["Classic", "Fiction", "Literary"]
 *         publicationDate: 1925-04-10T00:00:00.000Z
 *         rating: 4.2
 *         pageCount: 180
 *         publisher: Charles Scribner's Sons
 *         createdAt: 2023-06-22T14:28:30.123Z
 *         updatedAt: 2023-06-22T14:28:30.123Z
 */

export default router;
