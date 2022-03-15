export interface CellProps {
  state: number;
  walls: boolean[];
}

export const Cell = ({ state, walls }: CellProps) => {
  const stateClasses = [
    'bg-gray-600',
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
      className={`border-gray-900 ${mapStateToClass} ${mapWallsToClass}`}
    ></div>
  );
};
