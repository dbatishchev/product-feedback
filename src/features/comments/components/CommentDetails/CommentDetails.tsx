import React from 'react';
import styles from './CommentDetails.module.css';
import Avatar from '../../../../app/components/Avatar/Avatar';
import { Comment } from '../../types/Comment';

type CommentDetailsProps = {
  comment: Comment,
  level?: number,
};

const CommentDetails: React.FC<CommentDetailsProps> = ({ comment, level = 1 }) => (
  <article
    className={`
      ${styles.comment}
      ${level === 1 ? styles.commentTopLevel : ''}
    `}
  >
    <div className={styles.avatar}>
      <Avatar user={comment.user} />
    </div>
    <div className={styles.userInfo}>
      <div className={styles.name}>{comment.user.name}</div>
      <div className={styles.email}>
        @
        {comment.user.username}
      </div>
    </div>
    <div className={styles.controls}>
      <button className={styles.reply}>Reply</button>
    </div>
    <div className={styles.text}>
      {comment.content}
    </div>
    {comment.replies && (
      <div
        className={styles.replies}
      >
        {comment.replies.map((reply) => (
          <CommentDetails level={level + 1} comment={reply} key={reply.id} />
        ))}
      </div>
    )}
  </article>
);

export default CommentDetails;
