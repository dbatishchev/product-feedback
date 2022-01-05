import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './Column.module.css';
import DraggableFeedbackCard from '../DraggableFeedbackCard/DraggableFeedbackCard';
import useAppSelector from '../../../../../app/hooks/useAppSelector';
import { selectFeedbacksByIds } from '../../../../feedback/slices/feedbacksSlice';
import useMediaQuery from '../../../../../app/hooks/useMediaQuery';

type ColumnProps = {
  title: string
  description: string
  droppableId: string
  selected: number[]
};

const Column: React.FC<ColumnProps> = ({
  title, description, droppableId, selected,
}) => {
  const feedbacks = useAppSelector((state) => selectFeedbacksByIds(state, selected));
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={styles.column}>
      {!isMobile && (
        <div className={styles.columnHeader}>
          <div className={styles.columnTitle}>{title}</div>
          <div className={styles.columnSubTitle}>{description}</div>
        </div>
      )}
      <div>
        <Droppable droppableId={droppableId}>
          {({ innerRef, placeholder }) => (
            <div
              ref={innerRef}
              className={styles.columnContent}
            >
              {feedbacks.map((item, index) => (
                <DraggableFeedbackCard item={item} index={index} key={item.id} />
              ))}
              {placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default Column;
