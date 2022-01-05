import React from 'react';
import styles from './MultiSelect.module.css';
import Chip from '../Chip/Chip';

type MultiSelectProps<T> = {
  values: { label: string, value: T }[],
  value: T[],
  onChange: (values: T[]) => void,
};

const MultiSelect = <T extends string>({ values, value, onChange }: MultiSelectProps<T>): React.ReactElement<MultiSelectProps<T>> => {
  const handleChange = (changedVal: T) => {
    let newValues;

    if (value.includes(changedVal)) {
      newValues = value?.filter((val) => val !== changedVal);
    } else {
      newValues = [...value, changedVal];
    }

    onChange(newValues.length === values.length ? [] : newValues);
  };

  const handleReset = () => {
    onChange([]);
  };

  return (
    <ul className={styles.multiselect}>
      <li className={styles.multiselectOption}>
        <Chip
          onClick={handleReset}
          active={value.length === 0}
        >
          All
        </Chip>
      </li>
      {values.map(({ value: v, label }) => (
        <li key={v} className={styles.multiselectOption}>
          <Chip
            onClick={() => handleChange(v)}
            active={value.includes(v)}
          >
            {label}
          </Chip>
        </li>
      ))}
    </ul>
  );
};

export default MultiSelect;
