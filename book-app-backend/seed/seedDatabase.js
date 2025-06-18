// seed/seedDatabase.js
require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');
const connectDB = require('../config/db');

const books = [
  {
    title: 'Onyx Storm',
    author: 'Rebecca Yarros',
    description: 'The third installment in The Empyrean series, this new adult romantic fantasy follows the aftermath of a devastating battle. As the characters confront their pasts and forge new paths, they navigate complex relationships and the challenges of a war-torn world.',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1720446357i/209439446.jpg',
    genres: ['Romance', 'Fantasy', 'New Adult'],
    publicationDate: new Date('2025-01-21'),
    rating: 4.5,
    pageCount: 544,
    publisher: 'Red Tower Books'
  },
    {
    title: 'The Four Engagement Rings of Sybil Rain',
    author: 'Hannah Brown',
    description: 'After being left at the altar, Sybil Rain embarks on a solo honeymoon to Hawaii, only to encounter not one, but two of her ex-fiancés. What ensues is a heartfelt journey of self-discovery, rekindled emotions, and the complexities of love.',
    coverImage: 'https://m.media-amazon.com/images/I/81p3X3h33ZL._SY342_.jpg',
    genres: ['Romance', 'Contemporary Fiction'],
    publicationDate: new Date('2025-06-24'),
    rating: 4.3,
    pageCount: 320,
    publisher: 'Forever'
  },

];

connectDB().then(async () => {
  try {
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});