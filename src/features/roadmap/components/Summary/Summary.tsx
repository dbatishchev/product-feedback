import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Summary.module.css';
import StatusLabel from '../../../feedback/components/StatusLabel/StatusLabel';
import { STATUS_LIST } from '../../../feedback/constants/statuses';
import useAppSelector from '../../../../app/hooks/useAppSelector';
import { selectFeedbackByStatusCount } from '../../../feedback/slices/feedbacksSlice';

type SummaryProps = {
};

const Summary: React.FC<SummaryProps> = () => {
  const feedbacksStatus = useAppSelector((state) => state.feedbacks.status);
  const feedbacksByStatusCount = useAppSelector(selectFeedbackByStatusCount);

  if (feedbacksStatus !== 'succeeded') {
    return null;
  }

  if (!feedbacksByStatusCount) {
    return null;
  }

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.title}>Roadmap</div>
        <div className={styles.links}>
          <Link to="/roadmap">View</Link>
        </div>
      </header>
      <div className={styles.content}>
        <ul className={styles.list}>
          {STATUS_LIST.map((s) => (
            <li className={styles.item} key={s.value}>
              <StatusLabel status={s.value} />
              <div className={styles.count}>{feedbacksByStatusCount[s.value]}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Summary;
