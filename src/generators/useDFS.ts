import { Position, useMaze } from '../hooks/useMaze';
import { useSettings } from '../hooks/useSettings';
import { CURRENT, OTHER, UNVISITED, VISITED } from '../utils/constants';

export const useDFS = () => {
  const { sleep } = useSettings();
  const {
    removeWallBetween,
    setCell,
    isCell,
    getRandomCell,
    getAdjacentCells,
    pToKey,
    kToPos,
    replaceState,
  } = useMaze();

  const dfs = async () => {
    const random = getRandomCell();
    const stack = [random];
    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      setCell(current, CURRENT);
      await sleep();
      const next = getAdjacentRandomUnvisited(kToPos(current));
      if (next) {
        stack.push(pToKey(next));
        removeWallBetween(current, pToKey(next));
        setCell(current, VISITED);
      } else {
        stack.pop();
        setCell(current, OTHER);
      }
    }
    replaceState(OTHER, VISITED);
  };

  const getAdjacentRandomUnvisited = (pos: Position) => {
    const adjacent = getAdjacentCells(pos).filter(pos =>
      isCell(pToKey(pos), UNVISITED)
    );
    return adjacent[Math.floor(Math.random() * adjacent.length)];
  };

  return { dfs };
};
