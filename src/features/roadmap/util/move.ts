import { DraggableLocation } from 'react-beautiful-dnd';
import { Status } from '../../feedback/types/Status';

const move = (
  source: number[],
  destination: number[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation,
  onMove: (id: number, status: Status) => void,
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };

  onMove(removed, droppableDestination.droppableId as Status);

  return result;
};

export default move;
