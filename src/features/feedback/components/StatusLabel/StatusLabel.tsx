import React from 'react';
import styles from './StatusLabel.module.css';
import { Status } from '../../types/Status';

type StatusLabelProps = {
  status: Status,
  className?: string,
};

const COLOR_CLASSNAMES = {
  planned: styles.planned,
  'in-progress': styles.inprogress,
  live: styles.live,
};

const LABELS = {
  planned: 'Planned',
  'in-progress': 'In-Progress',
  live: 'Live',
};

const StatusLabel: React.FC<StatusLabelProps> = ({ status, className = '' }) => (
  <span className={`${styles.status} ${COLOR_CLASSNAMES[status]} ${className}`}>
    {LABELS[status]}
  </span>
);

export default StatusLabel;
