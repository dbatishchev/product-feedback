import React from 'react';
import {
  FieldProps, Form, Formik, FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './FeedbackForm.module.css';
import FormFieldFormik from '../../../../app/components/FormFieldFormik/FormFieldFormik';
import Button, { COLOR } from '../../../../app/components/Button/Button';
import Paper from '../../../../app/components/Paper/Paper';
import { ReactComponent as NewFeedback } from '../../../../app/icons/new-feedback.svg';
import Input from '../../../../app/components/Input/Input';
import { addNewFeedback, editFeedback } from '../../slices/feedbacksSlice';
import { Feedback } from '../../types/Feedback';
import useAppDispatch from '../../../../app/hooks/useAppDispatch';
import { CATEGORY_LIST } from '../../constants/categories';
import { Category } from '../../types/Category';
import Select from '../../../../app/components/Select/Select';
import { Status } from '../../types/Status';
import { STATUS_LIST } from '../../constants/statuses';

type FeedbackFormValues = Feedback;

const CommentValidationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
});

interface FeedbackFormProps {
  feedback?: Feedback,
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ feedback }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <Paper className={styles.formContainer}>
      <Formik
        initialValues={feedback ? { ...feedback } : {
          id: 20,
          title: '',
          description: '',
          category: 'enhancement',
          status: 'live',
          upvotes: 0,
          comments: [],
        }}
        validationSchema={CommentValidationSchema}
        onSubmit={async (
          values: FeedbackFormValues,
          { setSubmitting }: FormikHelpers<FeedbackFormValues>,
        ) => {
          if (feedback) {
            await dispatch(editFeedback(values));
          } else {
            await dispatch(addNewFeedback(values));
          }

          setSubmitting(false);
          navigate('/feedback');
        }}
      >
        {() => (
          <Form className={styles.form}>
            <div className={styles.bigIconContainer}>
              <div className={styles.bigIcon}>
                <NewFeedback />
              </div>
            </div>
            <div className={styles.title}>
              {feedback ? `Editing ‘${feedback.title}’` : 'Create New Feedback'}
            </div>
            <div className={styles.fields}>
              <FormFieldFormik
                id="title"
                name="title"
                label="Feedback Title"
                labelAdditional="Add a short, descriptive headline"
                fieldComponent={Input}
              />
              <FormFieldFormik
                id="category"
                name="category"
                label="Category"
                labelAdditional="Choose a category for your feedback"
              >
                {({ field, form }: FieldProps) => (
                  <Select<Category>
                    placeholder="Select Category"
                    values={CATEGORY_LIST}
                    value={field.value}
                    onChange={(val) => {
                      form.setFieldValue(field.name, val);
                    }}
                  />
                )}
              </FormFieldFormik>
              <FormFieldFormik
                id="status"
                name="status"
                label="Update Status"
                labelAdditional="Change feedback state"
              >
                {({ field, form }: FieldProps) => (
                  <Select<Status>
                    placeholder="Select Status"
                    values={STATUS_LIST}
                    value={field.value}
                    onChange={(val) => {
                      form.setFieldValue(field.name, val);
                    }}
                  />
                )}
              </FormFieldFormik>
              <FormFieldFormik
                id="description"
                name="description"
                label="Feedback Detail"
                labelAdditional="Include any specific comments on what should be improved, added, etc."
              />
            </div>
            <footer className={styles.footer}>
              <Button color={COLOR.dark} onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button type="submit">
                {feedback ? 'Save Changes' : 'Add Feedback'}
              </Button>
            </footer>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default FeedbackForm;
