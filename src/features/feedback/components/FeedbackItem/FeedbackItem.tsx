import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeedbackItem.module.css';
import Paper from '../../../../app/components/Paper/Paper';
import Voter from '../../../voter/components/Voter/Voter';
import CommentsCount from '../../../comments/components/CommentsCount/CommentsCount';
import { Feedback } from '../../types/Feedback';
import Chip from '../../../../app/components/Chip/Chip';
import CATEGORY_BY_KEY from '../../constants/categories';
import useMediaQuery from '../../../../app/hooks/useMediaQuery';

type FeedbackItemProps = {
  feedback: Feedback,
};

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Paper>
      <div className={styles.item}>
        <div className={styles.voter}>
          <Voter feedbackId={feedback.id} votes={feedback.upvotes} isVertical={!isMobile} />
        </div>
        <div className={styles.title}>
          <Link to={`/feedback/${feedback.id}`}>{feedback.title}</Link>
        </div>
        <div className={styles.description}>
          {feedback.description}
        </div>
        {feedback.category && (
          <div className={styles.tags}>
            <Chip>{CATEGORY_BY_KEY[feedback.category].label}</Chip>
          </div>
        )}
        <div className={styles.comments}>
          <CommentsCount count={feedback?.comments?.length ?? 0} />
        </div>
      </div>
    </Paper>
  );
};

export default FeedbackItem;
