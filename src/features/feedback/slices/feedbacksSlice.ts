import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import FeedbackAPI from '../api/FeedbackAPI';
import { Feedback } from '../types/Feedback';
import { Comment } from '../../comments/types/Comment';
import { selectCategories, selectSort } from '../../filters/slices/filtersSlice';
import { addNewComment, commentsFromFeedbacksFetched } from '../../comments/slices/commentsSlice';
import type { RootState } from '../../../app/store';
import { Status } from '../types/Status';
import { Sort } from '../../filters/types/Sort';
import { FeedbackListSorter } from '../types/FeedbackListSorter';

const feedbacksAdapter = createEntityAdapter<Feedback>();

const initialState = feedbacksAdapter.getInitialState({
  status: 'idle',
  error: null as (string | null),
});

export const fetchFeedbacks = createAsyncThunk('feedbacks/fetchFeedbacks', async (_, { dispatch }) => {
  const feedbacks = await FeedbackAPI.fetchFeedbacks();
  const comments = feedbacks.map((f) => f.comments ?? []).flat();
  dispatch(commentsFromFeedbacksFetched(comments));

  return feedbacks;
});

export const addNewFeedback = createAsyncThunk('feedbacks/addNewFeedback', async (newFeedback: Feedback) => FeedbackAPI.save(newFeedback));
export const editFeedback = createAsyncThunk('feedbacks/editFeedback', async (feedback: Feedback) => FeedbackAPI.save(feedback));

export const upvote = createAsyncThunk(
  'feedbacks/upvote',
  async (feedbackId: number) => {
    await FeedbackAPI.upvote(feedbackId);

    return { feedbackId, status: true };
  },
);

export const downvote = createAsyncThunk(
  'feedbacks/downvote',
  async (feedbackId: number) => {
    await FeedbackAPI.downvote(feedbackId);

    return { feedbackId, status: true };
  },
);

export const changeStatus = createAsyncThunk(
  'feedbacks/changeStatus',
  async ({ feedbackId, status }: { feedbackId: number, status: Status }) => {
    await FeedbackAPI.changeStatus(feedbackId, status);

    return { feedbackId, status };
  },
);

const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        action.payload.forEach((f) => {
          const comments: Comment[] = f.comments ?? [];
          f.comments = comments.map((comment) => comment.id);
        });

        feedbacksAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(addNewFeedback.fulfilled, feedbacksAdapter.addOne)
      .addCase(editFeedback.fulfilled, feedbacksAdapter.upsertOne)
      .addCase(upvote.fulfilled, (state, action) => {
        const { feedbackId } = action.payload;
        const existingFeedback = state.entities[feedbackId];
        if (existingFeedback) {
          existingFeedback.upvotes += 1;
        }
      })
      .addCase(downvote.fulfilled, (state, action) => {
        const { feedbackId } = action.payload;
        const existingFeedback = state.entities[feedbackId];
        if (existingFeedback) {
          existingFeedback.upvotes -= 1;
        }
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        const { feedbackId, comment } = action.payload;
        const existingFeedback = state.entities[feedbackId];
        if (existingFeedback) {
          existingFeedback.comments.push(comment.id);
        }
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        const { feedbackId, status } = action.payload;
        const existingFeedback = state.entities[feedbackId];
        if (existingFeedback) {
          existingFeedback.status = status;
        }
      });
  },
});

export const {
  selectEntities: selectFeedbacks,
  selectAll: selectAllFeedbacks,
  selectById: selectFeedbackById,
  selectIds: selectFeedbackIds,
} = feedbacksAdapter.getSelectors((state: RootState) => state.feedbacks);

export const selectFeedbacksByIds = createSelector(
  [
    selectFeedbacks,
    (state: RootState, feedbackIds: number[]) => feedbackIds,
  ],
  (feedbacks, ids) => ids
    .map((id) => feedbacks[id])
    .filter((f): f is Feedback => Boolean(f)),
);

export const selectSortedFeedbacks = createSelector(
  [selectAllFeedbacks, selectSort],
  (feedbacks, sort: Sort) => {
    const sorters: Record<Sort, FeedbackListSorter> = {
      'upvotes-desc': (a, b) => b.upvotes - a.upvotes,
      'upvotes-asc': (a, b) => a.upvotes - b.upvotes,
      'comments-desc': (a, b) => (b.comments ? b.comments.length : 0) - (a.comments ? a.comments.length : 0),
      'comments-asc': (a, b) => (a.comments ? a.comments.length : 0) - (b.comments ? b.comments.length : 0),
    };

    return [...feedbacks].sort(sorters[sort]);
  },
);

export const selectFilteredFeedbacks = createSelector(
  [selectSortedFeedbacks, selectCategories],
  (feedbacks, categories) => (categories.length > 0 ? feedbacks.filter((f) => categories.includes(f.category)) : feedbacks),
);

export const selectFeedbackByStatusCount = createSelector(
  [selectAllFeedbacks],
  (feedbacks) => {
    if (!feedbacks || feedbacks.length === 0) {
      return null;
    }

    const acc: Record<Status, number> = {
      planned: 0,
      'in-progress': 0,
      live: 0,
    };

    feedbacks.forEach((f) => {
      acc[f.status] += 1;
    });

    return acc;
  },
);

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default feedbacksSlice.reducer;
