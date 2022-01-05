import React from 'react';
import {
  Formik, Form, FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import styles from './AddCommentForm.module.css';
import Paper from '../../../../app/components/Paper/Paper';
import Button from '../../../../app/components/Button/Button';
import FormFieldFormik from '../../../../app/components/FormFieldFormik/FormFieldFormik';
import { addNewComment } from '../../slices/commentsSlice';
import getRandomInt from '../../../../app/util/getRandomInt';
import { Comment } from '../../types/Comment';
import useAppDispatch from '../../../../app/hooks/useAppDispatch';
import useAppSelector from '../../../../app/hooks/useAppSelector';

type CommentFormValues = {
  message: string,
};

const CommentValidationSchema = Yup.object().shape({
  message: Yup.string().max(255).required('Required'),
});

interface AddCommentFormProps {
  feedbackId: number,
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ feedbackId }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  if (!currentUser) {
    return null;
  }

  return (
    <Paper>
      <Formik
        initialValues={{ message: '' }}
        validationSchema={CommentValidationSchema}
        onSubmit={async (
          values: CommentFormValues,
          { resetForm }: FormikHelpers<CommentFormValues>,
        ) => {
          const comment: Comment = {
            id: getRandomInt(1000),
            content: values.message,
            user: currentUser,
          };

          await dispatch(addNewComment({ comment, feedbackId }));
          resetForm();
        }}
      >
        {({ values, errors }) => (
          <Form className={styles.form}>
            <div className={styles.title}>
              Add Comment
            </div>
            <div>
              <FormFieldFormik id="message" name="message" label="" />
            </div>
            <footer className={styles.footer}>
              <div className={styles.validationHint}>
                {255 - values.message.length}
                {' '}
                characters left
              </div>
              <Button type="submit">Post Comment</Button>
            </footer>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default AddCommentForm;
