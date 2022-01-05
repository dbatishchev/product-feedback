import React from 'react';
import styles from './Voter.module.css';
import { ReactComponent as ArrowUp } from '../../../../app/icons/arrow-up.svg';
import { downvote, upvote } from '../../../feedback/slices/feedbacksSlice';
import { selectHasVotedForFeedback } from '../../../currentUser/slices/currentUserSlice';
import useAppSelector from '../../../../app/hooks/useAppSelector';
import useAppDispatch from '../../../../app/hooks/useAppDispatch';

type VoterProps = {
  votes: number
  feedbackId: number,
  isVertical?: boolean,
};

const Voter: React.FC<VoterProps> = ({ votes, feedbackId, isVertical = false }) => {
  const dispatch = useAppDispatch();
  const hasVoted = useAppSelector((state) => selectHasVotedForFeedback(state, feedbackId));
  const handleClick = () => {
    if (hasVoted) {
      dispatch(downvote(feedbackId));
    } else {
      dispatch(upvote(feedbackId));
    }
  };

  return (
    <div
      className={`${styles.voter} ${isVertical ? styles.vertical : ''} ${hasVoted ? styles.active : styles.inactive}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <ArrowUp />
      {votes}
    </div>
  );
};

export default Voter;
