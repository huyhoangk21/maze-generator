import { useSettings } from '../hooks/useSettings';
import { useWidth } from '../hooks/useWidth';
import { UNVISITED } from '../utils/constants';
import { Cell } from './Cell';

const Maze = () => {
  const { width } = useWidth();
  const { size } = useSettings();

  return (
    <div
      className='border border-black grid'
      style={{
        width,
        height: width,
        gridTemplate: `repeat(${size},1fr) / repeat(${size},1fr)`,
      }}
    >
      {Array.from(Array(size * size).keys()).map(key => (
        <Cell key={key} state={UNVISITED} walls={[true, true, true, true]} />
      ))}
    </div>
  );
};

export default Maze;
