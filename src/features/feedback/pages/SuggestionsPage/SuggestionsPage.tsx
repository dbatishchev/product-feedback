import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './SuggestionsPage.module.css';
import FeedbackList from '../../components/FeedbackList/FeedbackList';
import Toolbar from '../../../../app/components/Toolbar/Toolbar';
import {
  fetchFeedbacks,
  selectFilteredFeedbacks,
} from '../../slices/feedbacksSlice';
import { ReactComponent as Suggestions } from '../../../../app/icons/suggestions.svg';
import CheckboxGroup from '../../../../app/components/CheckboxGroup/CheckboxGroup';
import { sortChanged } from '../../../filters/slices/filtersSlice';
import { Sort } from '../../../filters/types/Sort';
import SORT_BY_KEY, { SORTS_LIST } from '../../../filters/constants/sorts';
import EmptyPlaceholder from '../../components/EmptyPlaceholder/EmptyPlaceholder';
import useAppDispatch from '../../../../app/hooks/useAppDispatch';
import useAppSelector from '../../../../app/hooks/useAppSelector';
import PopoverButton from '../../../../app/components/PopoverButton/PopoverButton';
import useMediaQuery from '../../../../app/hooks/useMediaQuery';

type SuggestionsPageProps = {
};

const SuggestionsPage: React.FC<SuggestionsPageProps> = () => {
  const dispatch = useAppDispatch();
  const sort: Sort = useAppSelector((state) => state.filters.sort);
  const feedbacksStatus = useAppSelector((state) => state.feedbacks.status);
  const feedbacks = useAppSelector(selectFilteredFeedbacks);

  useEffect(() => {
    if (feedbacksStatus === 'idle') {
      dispatch(fetchFeedbacks());
    }
  }, []);

  const handleSortChange = (val: Sort | Sort[]) => {
    dispatch(sortChanged(val as Sort));
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  const toolbarTitle = `${feedbacks.length} Suggestions`;

  if (feedbacksStatus !== 'succeeded') {
    return null;
  }

  return (
    <div>
      <Toolbar
        className={styles.toolbar}
        title={!isMobile ? toolbarTitle : ''}
        icon={<Suggestions />}
        controls={(
          <PopoverButton
            name={`Sort by: ${SORT_BY_KEY[sort].label}`}
          >
            <CheckboxGroup<Sort>
              values={SORTS_LIST}
              value={sort}
              onChange={handleSortChange}
            />
          </PopoverButton>
        )}
      />
      {feedbacks.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <FeedbackList feedbacks={feedbacks} />
      )}
      <Outlet />
    </div>
  );
};

export default SuggestionsPage;
