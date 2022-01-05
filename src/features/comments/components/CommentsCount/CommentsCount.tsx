import React from 'react';
import styles from './CommentsCount.module.css';
import { ReactComponent as Comments } from '../../../../app/icons/comments.svg';

type CommentsCountProps = {
  count: number,
};

const CommentsCount: React.FC<CommentsCountProps> = ({ count }) => (
  <span className={styles.container}>
    <Comments />
    <span className={styles.count}>
      {count}
    </span>
  </span>
);

export default CommentsCount;
