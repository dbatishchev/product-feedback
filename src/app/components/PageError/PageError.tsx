import React from 'react';
import styles from './PageError.module.css';
import Button from '../Button/Button';

type PageErrorProps = {};

const PageError: React.FC<PageErrorProps> = () => {
  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Something went wrong</div>
      <Button onClick={handleReloadClick}>
        Reload Page
      </Button>
    </div>
  );
};

export default PageError;
