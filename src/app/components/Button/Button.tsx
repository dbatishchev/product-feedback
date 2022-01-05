import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export const enum COLOR {
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

type ButtonProps = {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string,
  type?: 'submit' | 'button',
  color?: COLOR,
  icon?: React.ReactNode,
  to?: string,
};

const Button: React.FC<ButtonProps> = ({
  children, onClick, className = '', type = 'button', color = COLOR.primary, icon, to,
}) => {
  const Component = to ? Link : 'button';

  return (
    <Component
      type={type}
      className={`
      ${styles.btn}
      ${COLOR_CLASSNAMES[color]}
      ${icon ? styles.withIcon : ''} 
      ${className}
    `}
      onClick={onClick}
      to={to!}
    >
      {icon && (
        <span className={styles.icon}>{icon}</span>
      )}
      {children}
    </Component>
  );
};

export default Button;
