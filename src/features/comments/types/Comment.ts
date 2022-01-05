import { User } from '../../users/types/User';

export type Comment = {
  id: number,
  content: string,
  user: User,
  replies?: Comment[],
};
