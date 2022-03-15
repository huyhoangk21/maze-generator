import { Position, useMaze } from '../hooks/useMaze';
import { useSettings } from '../hooks/useSettings';
import { CURRENT, OTHER, UNVISITED, VISITED } from '../utils/constants';

export const useWilson = () => {
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

  const wilson = async () => {
    setCell(getRandomCell(), VISITED);
    const path: (number | null)[] = Array.from(Array(cells.length), () => null);
    let remaining = cells.length - 1;
    while (remaining > 0) {
      const { entry } = await walk(path);
      const n = await reconstruct(path, entry);
      remaining -= n;
    }
  };

  const walk = async (previous: (number | null)[]) => {
    let entry = getRandomUnvisited();
    let current = entry;
    while (!isCell(current, VISITED)) {
      setCell(current, CURRENT);
      await sleep();
      const next = pToKey(getRandomAdjacent(kToPos(current)));
      previous[current] = next;
      setCell(current, OTHER);
      current = next;
    }
    return { entry };
  };

  const reconstruct = async (previous: (number | null)[], entry: number) => {
    let n = 0;
    let current = entry;
    while (!isCell(current, VISITED)) {
      if (previous[current]) {
        removeWallBetween(current, previous[current]!);
      }
      setCell(current, VISITED);
      await sleep();
      current = previous[current]!;
      n++;
    }
    replaceState(OTHER, UNVISITED);
    return n;
  };

  const getRandomAdjacent = (pos: Position) => {
    const adjacent = getAdjacentCells(pos);
    return adjacent[Math.floor(Math.random() * adjacent.length)];
  };

  const getRandomUnvisited = () => {
    let random = getRandomCell();
    while (isCell(random, VISITED)) {
      random = getRandomCell();
    }
    return random;
  };

  return { wilson };
};
