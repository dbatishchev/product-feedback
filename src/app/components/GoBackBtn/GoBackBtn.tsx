import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GoBackBtn.module.css';
import { ReactComponent as ArrowLeft } from '../../icons/arrow-left.svg';

type GoBackBtnProps = {
  className?: string,
};

const GoBackBtn: React.FC<GoBackBtnProps> = ({ className }) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={`${styles.goBackBtn} ${className}`}
      onClick={handleBackClick}
    >
      <ArrowLeft />
      <span>Go Back</span>
    </button>
  );
};

export default GoBackBtn;
