import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import styles from './Modal.module.css';
import GoBackBtn from '../GoBackBtn/GoBackBtn';

type ModalProps = {
  children: React.ReactNode,
  active: boolean,
  headerElements?: React.ReactNode,
};

const Modal: React.FC<ModalProps> = ({
  children, active, headerElements,
}) => {
  useEffect(() => {
    if (active) {
      document.body.style.position = 'fixed';
    }

    return () => {
      document.body.style.position = 'static';
    };
  }, [active]);

  if (!active) {
    return null;
  }

  return createPortal(
    <FocusTrap>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={styles.overlay}
        />
        <div className={styles.body}>
          <div className={styles.content}>
            <nav className={styles.nav}>
              <GoBackBtn />
              {headerElements && (
                <div className={styles.navAdditionalElements}>
                  {headerElements}
                </div>
              )}
            </nav>
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body,
  );
};

export default Modal;
