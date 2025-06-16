export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genres: string[];
  publicationDate: string;
  rating?: number;
  pageCount: number;
  publisher: string;
}

export interface FilterOptions {
  searchQuery: string;
  genres: string[];
  authors: string[];
  minDate: string;
  maxDate: string;
  sortBy: 'title' | 'author' | 'publicationDate' | 'rating';
  sortOrder: 'asc' | 'desc';
}
