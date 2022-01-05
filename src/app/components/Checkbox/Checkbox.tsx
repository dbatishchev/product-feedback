import React from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = {
  value: string,
  checked?: boolean,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
};

const Checkbox: React.FC<CheckboxProps> = ({ value, onChange, checked = false }) => (
  <input
    type="checkbox"
    className={styles.checkbox}
    value={value}
    checked={checked}
    onChange={onChange}
  />
);

export default Checkbox;
