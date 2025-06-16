import express from 'express';
import Book from '../models/Book';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Meta
 *   description: Metadata endpoints
 */

/**
 * @swagger
 * /api/meta/genres:
 *   get:
 *     summary: Get all available genres
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: List of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */

// Get all genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genres');
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres' });
  }
});

/**
 * @swagger
 * /api/meta/authors:
 *   get:
 *     summary: Get all available authors
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: List of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 */

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
