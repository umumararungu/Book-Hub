export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genres: string[];
  publicationDate: string;
  rating?: number;
}