import React from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  className: string,
  controls?: React.ReactNode,
};

const Header: React.FC<HeaderProps> = ({ className, controls }) => (
  <header className={`${styles.header} ${className}`}>
    <div>
      <div className={styles.siteName}>Frontend Mentor</div>
      <div className={styles.pageName}>Feedback Board</div>
    </div>
    <div className={styles.controls}>{controls}</div>
  </header>
);

export default Header;
