// features/ratings/ratingsSlice.ts
import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface Rating {
  bookId: string;
  userId: string;
  score: number; // from 1 to 5
}

interface RatingsState {
  ratings: Rating[]; // ratings by user/book
}

const initialState: RatingsState = {
  ratings: [],
};

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    addRating(state, action: PayloadAction<Rating>) {
      const { bookId, userId, score } = action.payload;
      const existing = state.ratings.find(r => r.bookId === bookId && r.userId === userId);
      if (existing) {
        existing.score = score; // update existing
      } else {
        state.ratings.push({ bookId, userId, score });
      }
    },
  },
});

export const { addRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
