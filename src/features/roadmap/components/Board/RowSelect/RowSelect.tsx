import React from 'react';
import styles from './RowSelect.module.css';
import { Status } from '../../../../feedback/types/Status';
import { STATUS_COLORS, STATUS_LIST } from '../../../../feedback/constants/statuses';
import useAppSelector from '../../../../../app/hooks/useAppSelector';
import { selectFeedbackByStatusCount } from '../../../../feedback/slices/feedbacksSlice';

type RowSelectProps = {
  active: Status,
  onClick: (status: Status) => void,
};

const RowSelect: React.FC<RowSelectProps> = ({ active, onClick }) => {
  const feedbacksByStatusCount = useAppSelector(selectFeedbackByStatusCount);

  if (!feedbacksByStatusCount) {
    return null;
  }

  return (
    <div className={styles.container}>
      {STATUS_LIST.map(({ value, label }) => (
        <div
          className={`
            ${styles.item} 
            ${active === value ? styles.active : ''}
          `}
          key={value}
          style={{
            '--color': STATUS_COLORS[value],
          } as React.CSSProperties}
          onClick={() => onClick(value)}
          onKeyPress={() => onClick(value)}
          role="button"
          tabIndex={0}
        >
          {label}
          {' '}
          (
          {feedbacksByStatusCount[value]}
          )
        </div>
      ))}
    </div>
  );
};

export default RowSelect;
