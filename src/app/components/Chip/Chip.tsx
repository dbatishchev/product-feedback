import React from 'react';
import styles from './Chip.module.css';

export enum COLOR {
  primary = 'primary',
  faint = 'faint',
  dark = 'dark',
  warning = 'warning',
}

const COLOR_CLASSNAMES = {
  [COLOR.primary]: styles.primary,
  [COLOR.faint]: styles.faint,
  [COLOR.dark]: styles.dark,
  [COLOR.warning]: styles.warning,
};

type ChipProps = {
  children: React.ReactNode,
  active?: boolean,
  onClick?: () => void,
  className?: string,
  color?: COLOR,
  icon?: React.ReactNode,
};

const Chip: React.FC<ChipProps> = ({
  children, active = false, onClick, className = '', color = COLOR.primary, icon,
}) => (
  <button
    type="button"
    className={`
      ${styles.chip}
      ${COLOR_CLASSNAMES[color]}
      ${active ? styles.active : styles.inactive} 
      ${icon ? styles.withIcon : ''} 
      ${className ?? ''}
    `}
    onClick={onClick}
  >
    {icon && (
    <span className={styles.icon}>{icon}</span>
    )}
    {children}
  </button>
);

export default Chip;
