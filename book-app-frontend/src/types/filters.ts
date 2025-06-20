export interface FilterOptions {
  searchQuery: string;
  sortBy: 'title' | 'author' | 'date' | 'rating';
  genre?: string;
  minRating?: number;
  publicationDate?: string;
}