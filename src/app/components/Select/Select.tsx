import React from 'react';
import styles from './Select.module.css';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';

type SelectProps<T> = {
  placeholder: string,
  values: { label: string, value: T }[],
  value: T | T[],
  onChange: (values: T | T[]) => void,
};

const Select = <T extends string>({
  placeholder, values, value, onChange,
} : SelectProps<T>): React.ReactElement<SelectProps<T>> => {
  const activeValue = values.filter((v) => {
    if (Array.isArray(value)) {
      return value.includes(v.value);
    }

    return v.value === value;
  });

  return (
    <div className={styles.select} role="button" tabIndex={0}>
      {activeValue ? activeValue[0].label : placeholder}
      <div className={styles.popover}>
        <CheckboxGroup<T>
          values={values}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Select;
