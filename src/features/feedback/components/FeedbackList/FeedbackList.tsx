import React from 'react';
import styles from './FeedbackList.module.css';
import Item from '../FeedbackItem/FeedbackItem';
import { Feedback } from '../../types/Feedback';

type FeedbackListProps = {
  feedbacks: Feedback[],
};

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => (
  <ul className={styles.list}>
    {feedbacks.map((feedback) => (
      <li key={feedback.id}>
        <Item feedback={feedback} />
      </li>
    ))}
  </ul>
);

export default FeedbackList;
