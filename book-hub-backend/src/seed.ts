import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book';

dotenv.config();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the 1920s.",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    genres: ["Classic", "Fiction", "Literary"],
    publicationDate: "1925-04-10",
    rating: 4.2,
    pageCount: 180,
    publisher: "Charles Scribner's Sons"
  },
    {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the 1920s.",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    genres: ["Classic", "Fiction", "Literary"],
    publicationDate: "1925-04-10",
    rating: 4.2,
    pageCount: 180,
    publisher: "Charles Scribner's Sons"
  },
    {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the 1920s.",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    genres: ["Classic", "Fiction", "Literary"],
    publicationDate: "1925-04-10",
    rating: 4.2,
    pageCount: 180,
    publisher: "Charles Scribner's Sons"
  },
    {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story of wealth, love, and the American Dream in the 1920s.",
    coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    genres: ["Classic", "Fiction", "Literary"],
    publicationDate: "1925-04-10",
    rating: 4.2,
    pageCount: 180,
    publisher: "Charles Scribner's Sons"
  },

];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    await Book.deleteMany({});
    await Book.insertMany(sampleBooks);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();