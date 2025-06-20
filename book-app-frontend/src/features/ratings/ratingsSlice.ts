
import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface Rating {
  bookId: string;
  userId: string;
  score: number; 
}

interface RatingsState {
  ratings: Rating[]; 
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
        existing.score = score; 
      } else {
        state.ratings.push({ bookId, userId, score });
      }
    },
  },
});

export const { addRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
