import { Comment } from '../types/Comment';

const CommentAPI = {
  async save(comment: Comment) {
    return Promise.resolve(comment);
  },
};

export default CommentAPI;
