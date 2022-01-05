import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './SideSheet.module.css';

type SideSheetProps = {
  opened: boolean,
  children: React.ReactNode,
  onClose: () => void,
};

const SideSheet: React.FC<SideSheetProps> = ({
  opened = false, children, onClose,
}) => {
  useEffect(() => {
    if (opened) {
      document.body.style.position = 'fixed';
    }

    return () => {
      document.body.style.position = 'static';
    };
  }, [opened]);

  if (!opened) {
    return null;
  }

  return createPortal(
    <div className={styles.sideSheet}>
      <div
        className={styles.overlay}
        onClick={onClose}
        onKeyPress={onClose}
        role="button"
        tabIndex={0}
        aria-label="Close"
      />
      <div className={styles.body}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default SideSheet;
