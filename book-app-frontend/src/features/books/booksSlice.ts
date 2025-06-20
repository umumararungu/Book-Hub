import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { type Book } from '../../types/book';
import { type FilterOptions } from '../../types/filters';
import { fetchBooks} from '../../api/bookApi';

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
      state.filteredBooks = action.payload;
      state.loading = false;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
      state.filteredBooks = state.books.filter((book: { title: string; author: string; }) => 
        book.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        book.author.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSortBy(state, action: PayloadAction<'title' | 'author' | 'date'>) {
      state.filters.sortBy = action.payload;
      state.filteredBooks = [...state.filteredBooks].sort((a, b) => {
        if (action.payload === 'title') {
          return a.title.localeCompare(b.title);
        } else if (action.payload === 'author') {
          return a.author.localeCompare(b.author);
        } else {
          return new Date(a.publicationDate).getTime() - new Date(b.publicationDate).getTime();
        }
      });
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
        state.error = null;
      })
        
      .addCase(loadBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },

});

export const { setBooks, setSearchQuery, setSortBy, setLoading, setError} = booksSlice.actions;
export default booksSlice.reducer;
