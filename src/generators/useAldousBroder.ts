import { Position, useMaze } from '../hooks/useMaze';
import { useSettings } from '../hooks/useSettings';
import { CURRENT, UNVISITED, VISITED } from '../utils/constants';

export const useAldousBroder = () => {
  const { sleep } = useSettings();
  const {
    removeWallBetween,
    cells,
    setCell,
    isCell,
    getRandomCell,
    getAdjacentCells,
    pToKey,
    kToPos,
    replaceState,
  } = useMaze();

  const aldousBroder = async () => {
    let remaining = cells.length - 1;
    let current = getRandomCell();
    while (remaining > 0) {
      const adjacent = pToKey(getRandomAdjacent(kToPos(current)));
      if (isCell(adjacent, UNVISITED)) {
        removeWallBetween(current, adjacent);
        remaining--;
      }
      setCell(current, VISITED);
      current = adjacent;
      setCell(adjacent, CURRENT);
      await sleep();
    }
    replaceState(CURRENT, VISITED);
  };

  const getRandomAdjacent = (pos: Position) => {
    const adjacent = getAdjacentCells(pos);
    return adjacent[Math.floor(Math.random() * adjacent.length)];
  };

  return { aldousBroder };
};
