import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import styles from './FeedbackCard.module.css';
import StatusLabel from '../../../../feedback/components/StatusLabel/StatusLabel';
import Chip from '../../../../../app/components/Chip/Chip';
import Voter from '../../../../voter/components/Voter/Voter';
import CommentsCount from '../../../../comments/components/CommentsCount/CommentsCount';
import { Feedback } from '../../../../feedback/types/Feedback';
import CATEGORY_BY_KEY from '../../../../feedback/constants/categories';

const COLOR_CLASSNAMES = {
  planned: styles.feedbackPlanned,
  'in-progress': styles.feedbackInprogress,
  live: styles.feedbackLive,
};

type FeedbackCardProps = {
  feedback: Feedback,
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot,
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, provided, snapshot }) => (
  <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={provided.draggableProps.style}
    className={`
      ${styles.item}
      ${COLOR_CLASSNAMES[feedback.status]}
      ${snapshot.isDragging ? styles.itemIsDragging : ''}
    `}
  >
    <StatusLabel status={feedback.status} className={styles.statusLabel} />
    <div className={styles.title}>
      {feedback.title}
    </div>
    <div className={styles.description}>{feedback.description}</div>
    <div className={styles.tags}>
      <Chip>{CATEGORY_BY_KEY[feedback.category].label}</Chip>
    </div>
    <footer className={styles.footer}>
      <Voter feedbackId={feedback.id} votes={feedback.upvotes} />
      <CommentsCount count={feedback?.comments?.length ?? 0} />
    </footer>
  </div>
);

export default FeedbackCard;
