import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './EditModal.module.css';
import Modal from '../../../../app/components/Modal/Modal';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import useAppSelector from '../../../../app/hooks/useAppSelector';
import { selectFeedbackById } from '../../slices/feedbacksSlice';

type EditModalProps = {
};

const EditModal: React.FC<EditModalProps> = () => {
  const { id } = useParams();
  const feedback = useAppSelector((state) => {
    if (!id) {
      return null;
    }

    return selectFeedbackById(state, id);
  });

  if (!feedback) {
    return null;
  }

  return (
    <Modal active>
      <div className={styles.details}>
        <FeedbackForm feedback={feedback} />
      </div>
    </Modal>
  );
};

export default EditModal;
