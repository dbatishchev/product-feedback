import React from 'react';
import styles from './Textarea.module.css';
import { IconPosition } from '../Input/Input';

type TextareaProps = {
  id?: string,
  name?: string,
  className?: string,
  readonly?: boolean,
  value?: number | string,
  icon?: React.ReactNode,
  iconPosition?: IconPosition,
  hasError?: boolean,
  [x: string]: any;
};

const Textarea: React.FC<TextareaProps> = ({
  id = '',
  name = '',
  className = '',
  readonly = false,
  value,
  hasError = false,
  ...rest
}) => (
  <div
    className={`
      ${styles.container} 
      ${hasError ? styles.containerWithError : ''}
    `}
  >
    <textarea
      id={id}
      name={name}
      className={`${styles.textarea} ${className}`}
      readOnly={readonly}
      value={value}
      {...rest}
    />
  </div>
);

export default Textarea;
