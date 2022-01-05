import {
  createSlice,
  createAsyncThunk, createSelector,
} from '@reduxjs/toolkit';
import UsersAPI from '../../users/api/UsersAPI';
import { User } from '../../users/types/User';
import { downvote, upvote } from '../../feedback/slices/feedbacksSlice';
import type { RootState } from '../../../app/store';

type UserSliceState = {
  currentUser: User | null
  votes: number[],
};

const initialState: UserSliceState = {
  currentUser: null,
  votes: [],
};

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => UsersAPI.fetchCurrentUser());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(upvote.fulfilled, (state, action) => {
      const { feedbackId } = action.payload;
      state.votes.push(feedbackId);
    });
    builder.addCase(downvote.fulfilled, (state, action) => {
      const { feedbackId } = action.payload;
      state.votes = state.votes.filter((v) => v !== feedbackId);
    });
  },
});

export const selectHasVotedForFeedback = createSelector(
  [
    (state: RootState) => state.currentUser.votes,
    (state: RootState, feedbackId: number) => feedbackId,
  ],
  (votes: number[], feedbackId) => votes.includes(feedbackId),
);

export default usersSlice.reducer;
