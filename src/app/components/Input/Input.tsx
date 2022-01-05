import React from 'react';
import styles from './Input.module.css';

export enum IconPosition {
  before = 'before',
  after = 'after',
}

const ICON_POSITION_CLASSNAMES = {
  [IconPosition.before]: styles.iconBefore,
  [IconPosition.after]: styles.iconAfter,
};

type InputProps = {
  id?: string,
  name?: string,
  type?: 'text' | 'email' | 'number',
  className?: string,
  readonly?: boolean,
  value?: number | string,
  icon?: React.ReactNode,
  iconPosition?: IconPosition,
  hasError?: boolean,
  [x: string]: any;
};

const Input: React.FC<InputProps> = ({
  id = '',
  name = '',
  type = 'text',
  className = '',
  readonly = false,
  value,
  icon = undefined,
  iconPosition = IconPosition.after,
  hasError = false,
  ...rest
}) => (
  <div
    className={`
      ${styles.container} 
      ${readonly ? styles.containerThin : ''}
      ${hasError ? styles.containerWithError : ''}
    `}
  >
    <input
      id={id}
      name={name}
      type={type}
      className={`${styles.input} ${className}`}
      readOnly={readonly}
      value={value}
      {...rest}
    />
    {icon && (
      <span className={`${styles.icon} ${ICON_POSITION_CLASSNAMES[iconPosition]}`}>
        {icon}
      </span>
    )}
  </div>
);

export default Input;
