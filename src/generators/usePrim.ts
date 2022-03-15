import { Position, useMaze } from '../hooks/useMaze';
import { useSettings } from '../hooks/useSettings';
import { OTHER, UNVISITED, VISITED } from '../utils/constants';

export const usePrim = () => {
  const { sleep } = useSettings();

  const {
    setCell,
    removeWallBetween,
    isCell,
    getAdjacentCells,
    getRandomCell,
    pToKey,
    kToPos,
  } = useMaze();

  const prim = async () => {
    let outer = [getRandomCell()];
    while (outer.length > 0) {
      const current = outer[Math.floor(Math.random() * outer.length)];
      const adjacent = getAdjacentRandomVisited(kToPos(current));
      if (adjacent) {
        removeWallBetween(current, pToKey(adjacent));
      }
      // eslint-disable-next-line no-loop-func
      getAllAdjacentUnvisited(kToPos(current)).forEach(pos => {
        outer.push(pToKey(pos));
        setCell(pToKey(pos), OTHER);
      });
      outer = outer.filter(key => key !== current);
      setCell(current, VISITED);
      await sleep();
    }
  };

  const getAllAdjacentUnvisited = (pos: Position) => {
    const adjacent = getAdjacentCells(pos).filter(pos =>
      isCell(pToKey(pos), UNVISITED)
    );
    return adjacent;
  };

  const getAdjacentRandomVisited = (pos: Position) => {
    const adjacent = getAdjacentCells(pos).filter(pos =>
      isCell(pToKey(pos), VISITED)
    );
    return adjacent[Math.floor(Math.random() * adjacent.length)];
  };

  return { prim };
};
