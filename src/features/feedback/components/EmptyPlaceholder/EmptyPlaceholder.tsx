import React from 'react';
import illustration from './illustration-empty.svg';
import styles from './EmpryPlaceholder.module.css';
import Button from '../../../../app/components/Button/Button';
import { ReactComponent as Plus } from '../../../../app/icons/plus.svg';
import Paper from '../../../../app/components/Paper/Paper';

type EmptyPlaceholderProps = {
};

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = () => (
  <Paper>
    <div className={styles.placeholder}>
      <img
        src={illustration}
        alt=""
        className={styles.img}
      />
      <h1 className={styles.title}>
        There is no feedback yet.
      </h1>
      <div className={styles.description}>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
      </div>
      <div className={styles.btn}>
        <Button
          icon={<Plus />}
          to="/feedback/create"
        >
          Add Feedback
        </Button>
      </div>
    </div>
  </Paper>
);

export default EmptyPlaceholder;
