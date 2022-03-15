import { useMaze } from '../hooks/useMaze';
import { useSettings } from '../hooks/useSettings';
import { useWidth } from '../hooks/useWidth';
import { Cell } from './Cell';

const Maze = () => {
  const { width } = useWidth();
  const { size } = useSettings();
  const { cells } = useMaze();

  return (
    <div
      className='border border-black grid'
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
