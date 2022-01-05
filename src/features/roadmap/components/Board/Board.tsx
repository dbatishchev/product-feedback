import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './Board.module.css';
import Column from './Column/Column';
import { STATUS_LIST } from '../../../feedback/constants/statuses';
import {
  changeStatus,
  selectFeedbackIds,
  selectFeedbacks,
} from '../../../feedback/slices/feedbacksSlice';
import useAppSelector from '../../../../app/hooks/useAppSelector';
import useAppDispatch from '../../../../app/hooks/useAppDispatch';
import useMediaQuery from '../../../../app/hooks/useMediaQuery';
import RowSelect from './RowSelect/RowSelect';
import { Status } from '../../../feedback/types/Status';
import reorder from '../../util/reorder';
import move from '../../util/move';

type BoardProps = {
};

const Board: React.FC<BoardProps> = () => {
  const [selectedStatus, setSelectedStatus] = useState<Status>('planned');
  const [itemsSort, setItemsSort] = useState<Record<Status, number[]>>({
    planned: [],
    'in-progress': [],
    live: [],
  });
  const dispatch = useAppDispatch();
  const feedbacks = useAppSelector(selectFeedbacks);
  const feedbackIds = useAppSelector(selectFeedbackIds);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const handleFeedbackMove = (feedbackId: number, status: Status) => {
    dispatch(changeStatus({ feedbackId, status }));
  };

  useEffect(() => {
    if (!feedbackIds) {
      return;
    }

    const sort: any = {};
    STATUS_LIST.forEach(({ value: status }) => {
      sort[status] = feedbackIds.filter((id) => feedbacks[id]?.status === status);
    });

    setItemsSort(sort);
  }, [feedbackIds]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceDroppableId = source.droppableId as Status;
    const destinationDroppableId = destination.droppableId as Status;

    if (source.droppableId === destination.droppableId) {
      setItemsSort({
        ...itemsSort,
        [source.droppableId]: reorder(
          itemsSort[sourceDroppableId],
          source.index,
          destination.index,
        ),
      });
    } else {
      const dropResult = move(
        itemsSort[sourceDroppableId],
        itemsSort[destinationDroppableId],
        source,
        destination,
        handleFeedbackMove,
      );

      setItemsSort({
        ...itemsSort,
        ...dropResult,
      });
    }
  };

  const columns = STATUS_LIST.map(({ description, label, value: status }) => ({
    label,
    description,
    status,
  }));

  const activeColumn = columns.find((c) => c.status === selectedStatus);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isMobile && (
        <RowSelect
          active={selectedStatus}
          onClick={setSelectedStatus}
        />
      )}
      <div className={styles.board}>
        {isMobile && activeColumn ? (
          <Column
            key={activeColumn.status}
            title={`${activeColumn.label} (${itemsSort[activeColumn.status].length})`}
            description={activeColumn.description}
            droppableId={activeColumn.status}
            selected={itemsSort[activeColumn.status]}
          />
        ) : columns.map((column) => (
          <Column
            key={column.status}
            title={`${column.label} (${itemsSort[column.status].length})`}
            description={column.description}
            droppableId={column.status}
            selected={itemsSort[column.status]}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
