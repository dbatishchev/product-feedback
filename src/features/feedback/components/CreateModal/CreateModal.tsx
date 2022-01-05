import React from 'react';
import styles from './CreateModal.module.css';
import Modal from '../../../../app/components/Modal/Modal';
import FeedbackForm from '../FeedbackForm/FeedbackForm';

type CreateModalProps = {
};

const CreateModal: React.FC<CreateModalProps> = () => (
  <Modal
    active
  >
    <div className={styles.details}>
      <FeedbackForm />
    </div>
  </Modal>
);

export default CreateModal;
