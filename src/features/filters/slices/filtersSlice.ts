import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../feedback/types/Category';
import { Sort } from '../types/Sort';
import { Status } from '../../feedback/types/Status';
import type { RootState } from '../../../app/store';

type FiltersState = {
  sort: Sort,
  categories: Category[],
  status: Status | null,
};

const initialState: FiltersState = {
  sort: 'upvotes-desc',
  categories: [],
  status: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    categoryFilterChanged(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    sortChanged(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
  },
});

export const { statusFilterChanged, categoryFilterChanged, sortChanged } = filtersSlice.actions;

export const selectSort = (state: RootState) => state.filters.sort;

export const selectCategories = (state: RootState) => state.filters.categories;

export default filtersSlice.reducer;
