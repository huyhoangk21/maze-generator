import { memo } from 'react';
import { useSettings } from '../hooks/useSettings';
import { NEW } from '../utils/constants';

export interface CellProps {
  state: number;
  walls: boolean[];
}

const Cell = ({ state, walls }: CellProps) => {
  const { appState } = useSettings();

  const stateClasses = [
    'bg-gray-900',
    'bg-white',
    'bg-blue-500',
    'bg-orange-400',
  ];

  const borderClasses = ['border-t', 'border-r', 'border-b', 'border-l'];

  const mapStateToClass = stateClasses[state];

  const mapWallsToClass = borderClasses
    .filter((_, index) => walls[index])
    .join(' ');

  return (
    <div
      className={`${mapStateToClass} ${mapWallsToClass} ${
        appState === NEW ? 'border-gray-700' : 'border-gray-900'
      }`}
    ></div>
  );
};

export default memo(Cell);
