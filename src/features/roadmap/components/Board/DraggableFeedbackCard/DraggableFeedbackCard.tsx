import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import FeedbackCard from '../FeedbackCard/FeedbackCard';
import { Feedback } from '../../../../feedback/types/Feedback';

type DraggableFeedbackCardProps = {
  item: Feedback,
  index: number,
};

const DraggableFeedbackCard: React.FC<DraggableFeedbackCardProps> = ({ index, item }) => (
  <Draggable
    key={item.id}
    draggableId={`${item.id}`}
    index={index}
  >
    {(provided, snapshot) => (
      <FeedbackCard provided={provided} snapshot={snapshot} feedback={item} />
    )}
  </Draggable>
);

export default DraggableFeedbackCard;
