import React from 'react';
import styles from './Paper.module.css';

type PaperProps = {
  children: React.ReactNode,
  className?: string,
};

const Paper: React.FC<PaperProps> = ({ className = '', children }) => (
  <div className={`${styles.paper} ${className}`}>
    {children}
  </div>
);

export default Paper;
