import React from 'react';
import styles from './PopoverButton.module.css';

type PopoverButtonProps = {
  name: string,
  children: React.ReactNode,
};

const PopoverButton: React.FC<PopoverButtonProps> = ({ name, children }) => (
  <div className={styles.btn} role="button" tabIndex={0}>
    {name}
    <div className={styles.popover}>
      {children}
    </div>
  </div>
);

export default PopoverButton;
