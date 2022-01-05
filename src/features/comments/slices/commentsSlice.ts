import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import CommentAPI from '../api/CommentAPI';
import { Comment } from '../types/Comment';
import type { RootState } from '../../../app/store';

const commentsAdapter = createEntityAdapter<Comment>();

export const addNewComment = createAsyncThunk(
  'comments/addNewComment',
  async ({ comment, feedbackId } : { comment: Comment, feedbackId: number }) => {
    await CommentAPI.save(comment);

    return {
      comment, feedbackId,
    };
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState(),
  reducers: {
    commentsFromFeedbacksFetched: (state, action) => {
      commentsAdapter.upsertMany(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewComment.fulfilled, (state, action) => {
        commentsAdapter.addOne(state, action.payload.comment);
      });
  },
});

export const { commentsFromFeedbacksFetched } = commentsSlice.actions;

export const {
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

export const selectCommentsByIds = (state: RootState, ids: number[]) => ids
  .map((id) => selectCommentById(state, id))
  .filter((c) : c is Comment => Boolean(c));

export default commentsSlice.reducer;
