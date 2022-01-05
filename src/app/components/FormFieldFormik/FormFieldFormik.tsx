import React from 'react';
import { Field, FieldProps } from 'formik';
import FormField from '../FormField/FormField';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

type FormFieldFormikProps = {
  id: string,
  name: string,
  label: string,
  labelAdditional?: string,
  children?: (props: FieldProps) => React.ReactNode,
  fieldComponent?: typeof Input | typeof Textarea,
};

const FormFieldFormik: React.FC<FormFieldFormikProps> = ({
  id, name, label, labelAdditional, children, fieldComponent = Textarea,
}) => {
  const FieldComponent = fieldComponent;

  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: FieldProps) => (
        <FormField
          id={id}
          label={label}
          labelAdditional={labelAdditional}
          errors={meta.touched && meta.error ? meta.error : ''}
        >
          {children ? children({ field, form, meta }) : <FieldComponent {...field} hasError={Boolean(meta.touched && meta.error)} />}
        </FormField>
      )}
    </Field>
  );
};

export default FormFieldFormik;
