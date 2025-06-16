import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genres: string[];
  publicationDate: Date;
  rating?: number;
  pageCount: number;
  publisher: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  genres: { type: [String], required: true },
  publicationDate: { type: Date, required: true },
  rating: { type: Number, min: 0, max: 5 },
  pageCount: { type: Number, required: true },
  publisher: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IBook>('Book', BookSchema);
