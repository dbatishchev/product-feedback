import React, { useEffect } from 'react';
import styles from './RoadmapPage.module.css';
import Toolbar from '../../../app/components/Toolbar/Toolbar';
import Board from '../components/Board/Board';
import { fetchFeedbacks } from '../../feedback/slices/feedbacksSlice';
import useAppSelector from '../../../app/hooks/useAppSelector';
import useAppDispatch from '../../../app/hooks/useAppDispatch';

type RoadmapPageProps = {
};

const RoadmapPage: React.FC<RoadmapPageProps> = () => {
  const dispatch = useAppDispatch();
  const feedbacksStatus = useAppSelector((state) => state.feedbacks.status);

  useEffect(() => {
    if (feedbacksStatus === 'idle') {
      dispatch(fetchFeedbacks());
    }
  }, []);

  if (feedbacksStatus !== 'succeeded') {
    return null;
  }

  return (
    <div>
      <Toolbar
        className={styles.toolbar}
        title="Roadmap"
        showGoBack
      />
      <Board />
    </div>
  );
};

export default RoadmapPage;
