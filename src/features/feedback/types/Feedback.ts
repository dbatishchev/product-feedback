import { Category } from './Category';
import { Status } from './Status';

export type Feedback = {
  id: number,
  title: string,
  category: Category,
  upvotes: number,
  status: Status,
  description: string,
  comments: number[]
};
