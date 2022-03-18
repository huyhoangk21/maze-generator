import { useMaze } from '../hooks/useMaze';
import { useSettings } from '../hooks/useSettings';
import { useWidth } from '../hooks/useWidth';
import { NEW } from '../utils/constants';
import { Cell } from './Cell';

const Maze = () => {
  const { width } = useWidth();
  const { size, appState } = useSettings();
  const { cells } = useMaze();

  return (
    <div
      className={`border  grid ${
        appState === NEW ? 'border-gray-700' : 'border-gray-900'
      }`}
      style={{
        width,
        height: width,
        gridTemplate: `repeat(${size},1fr) / repeat(${size},1fr)`,
      }}
    >
      {cells.map(cell => (
        <Cell {...cell} />
      ))}
    </div>
  );
};

export default Maze;
