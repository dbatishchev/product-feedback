import { Sort } from '../types/Sort';

const SORT_BY_KEY: Record<Sort, { label: string }> = {
  'upvotes-desc': {
    label: 'Most Upvotes',
  },
  'upvotes-asc': {
    label: 'Least Upvotes',
  },
  'comments-desc': {
    label: 'Most Comments',
  },
  'comments-asc': {
    label: 'Least Comments',
  },
};

export const SORTS_LIST = Object.entries(SORT_BY_KEY).map(([value, entry]) => ({ value: value as Sort, label: entry.label }));

export default SORT_BY_KEY;
