import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetailsModal.module.css';
import Modal from '../../../../app/components/Modal/Modal';
import FeedbackItem from '../FeedbackItem/FeedbackItem';
import CommentList from '../../../comments/components/CommentList/CommentList';
import AddCommentForm from '../../../comments/components/AddCommentForm/AddCommentForm';
import { selectFeedbackById } from '../../slices/feedbacksSlice';
import Button, { COLOR } from '../../../../app/components/Button/Button';
import { selectCommentsByIds } from '../../../comments/slices/commentsSlice';
import useAppSelector from '../../../../app/hooks/useAppSelector';

type DetailsModalProps = {
};

const DetailsModal: React.FC<DetailsModalProps> = () => {
  const { id } = useParams();
  const feedback = useAppSelector((state) => {
    if (!id) {
      return null;
    }

    return selectFeedbackById(state, id);
  });

  const comments = useAppSelector((state) => {
    if (!feedback) {
      return [];
    }

    return selectCommentsByIds(state, feedback.comments);
  });

  if (!feedback) {
    return null;
  }

  return (
    <Modal
      active
      headerElements={(
        <Button color={COLOR.faint} to="edit">Edit Feedback</Button>
      )}
    >
      <div className={styles.details}>
        <FeedbackItem
          feedback={feedback}
        />
        {comments && comments.length > 0 && (
          <CommentList
            comments={comments}
          />
        )}
        <AddCommentForm
          feedbackId={feedback.id}
        />
      </div>
    </Modal>
  );
};

export default DetailsModal;
