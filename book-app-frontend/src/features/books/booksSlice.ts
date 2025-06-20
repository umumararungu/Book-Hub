import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { type Book } from '../../types/book';
import { type FilterOptions } from '../../types/filters';
import { fetchBooks } from '../../api/bookApi';

interface BooksState {
  books: Book[];
  filteredBooks: Book[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
}

const initialState: BooksState = {
  books: [],
  filteredBooks: [],
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
    sortBy: 'title',
  },
};

export const loadBooks = createAsyncThunk(
  'books/loadBooks',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchBooks();
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
      booksSlice.caseReducers.applyFilters(state);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
      booksSlice.caseReducers.applyFilters(state);
    },
    setSortBy(state, action: PayloadAction<'title' | 'author' | 'date' | 'rating'>) {
      state.filters.sortBy = action.payload;
      booksSlice.caseReducers.applyFilters(state);
    },
    setGenreFilter(state, action: PayloadAction<string>) {
      state.filters.genre = action.payload;
      booksSlice.caseReducers.applyFilters(state);
    },
    setMinRating(state, action: PayloadAction<number>) {
      state.filters.minRating = action.payload;
      booksSlice.caseReducers.applyFilters(state);
    },
    setPublicationDate(state, action: PayloadAction<string>) {
      state.filters.publicationDate = action.payload;
      booksSlice.caseReducers.applyFilters(state);
    },
    applyFilters(state) {
      const { searchQuery, genre, minRating, publicationDate, sortBy } = state.filters;
      let result = [...state.books];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
        );
      }

      if (genre) {
        result = result.filter(book => Array.isArray(book.genres) && book.genres.includes(genre));
      }

      if (minRating !== undefined) {
result = result.filter(book => (book.rating ?? 0) >= minRating);
      }

      if (publicationDate) {
        result = result.filter(book =>
          new Date(book.publicationDate) >= new Date(publicationDate)
        );
      }

      result.sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'author') return a.author.localeCompare(b.author);
        if (sortBy === 'date') return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
        if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
        return 0;
      });

      state.filteredBooks = result;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) {
          state.error = 'Received empty book data';
          return;
        }
        state.books = action.payload;
        booksSlice.caseReducers.applyFilters(state);
        state.error = null;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setBooks,
  setSearchQuery,
  setSortBy,
  setGenreFilter,
  setMinRating,
  setPublicationDate,
  setLoading,
  setError,
  applyFilters,
} = booksSlice.actions;

export default booksSlice.reducer;
