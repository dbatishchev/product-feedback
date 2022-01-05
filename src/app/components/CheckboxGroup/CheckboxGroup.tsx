import React, { ChangeEvent } from 'react';
import styles from './CheckboxGroup.module.css';

type CheckboxGroupProps<T> = {
  values: { label: string, value: T }[],
  value: T | T[],
  onChange: (values: T | T[]) => void,
};

const CheckboxGroup = <T extends string>({ values, value, onChange } : CheckboxGroupProps<T>): React.ReactElement<CheckboxGroupProps<T>> => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: v, checked } = event.target;

    if (Array.isArray(value)) {
      if (checked) {
        return onChange([...(value || []), v as T]);
      }

      return onChange(value?.filter((val) => val !== v));
    }

    return onChange(v as T);
  };

  return (
    <div className={styles.checkboxGroup}>
      {values.map(({ value: v, label }) => (
        <label key={v} className={styles.checkboxLabel}>
          <span>{label}</span>
          <input
            type="checkbox"
            className={styles.checkbox}
            value={v}
            checked={value?.includes(v)}
            onChange={handleChange}
          />
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
