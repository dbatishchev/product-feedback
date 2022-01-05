import React from 'react';
import styles from './FormField.module.css';

type FormFieldProps = {
  id: string,
  label: string,
  labelAdditional?: string,
  children: React.ReactNode,
  errors?: string,
};

const FormField: React.FC<FormFieldProps> = ({
  id, label, labelAdditional = '', errors, children,
}) => (
  <div className={styles.formField}>
    <label
      htmlFor={id}
      className={`${styles.label} ${errors ? styles.warning : ''}`}
    >
      <strong>{label}</strong>
      {labelAdditional && (
        <div>{labelAdditional}</div>
      )}
    </label>
    {errors && (
      <span className={`${styles.error} ${styles.warning}`}>{errors}</span>
    )}
    <span className={styles.input}>
      {children}
    </span>
  </div>
);

export default FormField;
