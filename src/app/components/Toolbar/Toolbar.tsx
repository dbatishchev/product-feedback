import React from 'react';
import styles from './Toolbar.module.css';
import Button from '../Button/Button';
import { ReactComponent as Plus } from '../../icons/plus.svg';
import GoBackBtn from '../GoBackBtn/GoBackBtn';

type ToolbarProps = {
  title: string,
  className?: string,
  showGoBack?: boolean,
  controls?:React.ReactNode,
  icon?:React.ReactNode,
};

const Toolbar: React.FC<ToolbarProps> = ({
  title, className, showGoBack = false, controls, icon,
}) => (
  <div className={`${styles.toolbar} ${className}`}>
    {icon && (
    <div className={styles.icon}>
      {icon}
    </div>
    )}
    <div>
      {showGoBack && (
        <GoBackBtn className={styles.goBack} />
      )}
      {title && (
        <div className={styles.title}>
          {title}
        </div>
      )}
    </div>
    {controls && (
    <div className={styles.filters}>
      { controls }
    </div>
    )}
    <div className={styles.controls}>
      <Button
        icon={<Plus />}
        to="/feedback/create"
      >
        Add Feedback
      </Button>
    </div>
  </div>
);

export default Toolbar;
