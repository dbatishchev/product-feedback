import { Category } from '../types/Category';

const CATEGORY_BY_KEY: Record<Category, { label: string }> = {
  enhancement: {
    label: 'Enhancement',
  },
  bug: {
    label: 'Bug',
  },
  feature: {
    label: 'Feature',
  },
};

export const CATEGORY_LIST = Object.entries(CATEGORY_BY_KEY).map(([value, entry]) => ({ value: value as Category, label: entry.label }));

export default CATEGORY_BY_KEY;
