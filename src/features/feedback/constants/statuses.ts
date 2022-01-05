import { Status } from '../types/Status';

const STATUS_BY_KEY: Record<Status, { label: string, description: string }> = {
  planned: {
    label: 'Planned',
    description: 'Ideas prioritized for research',
  },
  'in-progress': {
    label: 'In-Progress',
    description: 'Currently being developed',
  },
  live: {
    label: 'Live',
    description: 'Released features',
  },
};

export const STATUS_COLORS: Record<Status, string> = {
  planned: '#F49F85',
  'in-progress': '#AD1FEA',
  live: '#62BCFA',
};

export const STATUS_LIST = Object.entries(STATUS_BY_KEY).map(([value, entry]) => ({ value: value as Status, label: entry.label, description: entry.description }));

export default STATUS_BY_KEY;
