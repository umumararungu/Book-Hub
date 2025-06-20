
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  genres: {
    type: [String],
    required: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  pageCount: {
    type: Number,
    required: true
  },
  publisher: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);
