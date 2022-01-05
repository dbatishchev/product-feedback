import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import feedbacksReducer from '../features/feedback/slices/feedbacksSlice';
import filtersReducer from '../features/filters/slices/filtersSlice';
import currentUserReducer from '../features/currentUser/slices/currentUserSlice';
import commentsReducer from '../features/comments/slices/commentsSlice';

export const store = configureStore({
  reducer: {
    feedbacks: feedbacksReducer,
    filters: filtersReducer,
    currentUser: currentUserReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
