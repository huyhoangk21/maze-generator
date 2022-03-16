import { Position, useMaze } from '../hooks/useMaze';
import { useSettings } from '../hooks/useSettings';
import { CURRENT, VISITED } from '../utils/constants';
import { UnionFind } from '../utils/UnionFind';

interface CellPair {
  first: number;
  second: number;
}

export const useKruskal = () => {
  const { sleep, size } = useSettings();
  const { removeWallBetween, setCell, pToKey, kToPos, isWithinMaze } =
    useMaze();

  const kruskal = async () => {
    const set = new UnionFind(size);
    const walls = getShuffledWalls();
    while (set.numComponents > 1) {
      const { first, second } = walls.pop()!;
      setCell(first, CURRENT);
      await sleep();
      setCell(first, VISITED);
      if (!set.connected(first, second)) {
        removeWallBetween(first, second);
        set.union(first, second);
      }
      setCell(second, CURRENT);
      await sleep();
      setCell(second, VISITED);
    }
  };

  const getAdjacentSW = (key: number) => {
    const [x, y] = kToPos(key);
    const adjacentPos: Position[] = [
      [x + 1, y],
      [x, y + 1],
    ];
    return adjacentPos.filter(pos => isWithinMaze(pos)).map(pos => pToKey(pos));
  };

  const getShuffledWalls = () => {
    const walls: CellPair[] = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const first = pToKey([i, j]);
        const adjacent = getAdjacentSW(first);
        for (let second of adjacent) {
          walls.push({ first, second });
        }
      }
    }
    return shuffle(walls);
  };

  const shuffle = (array: CellPair[]) => {
    return array.sort(() => Math.random() - 0.5);
  };
  return { kruskal };
};
