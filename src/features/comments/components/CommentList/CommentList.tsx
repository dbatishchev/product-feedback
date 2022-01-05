import React from 'react';
import styles from './CommentList.module.css';
import CommentDetails from '../CommentDetails/CommentDetails';
import Paper from '../../../../app/components/Paper/Paper';
import { Comment } from '../../types/Comment';

type CommentListProps = {
  comments: Comment[]
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <Paper>
    <ul className={styles.commentList}>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentDetails comment={comment} />
        </li>
      ))}
    </ul>
  </Paper>
);

export default CommentList;
