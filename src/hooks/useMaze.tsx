import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { BOTTOM, LEFT, NEW, RIGHT, TOP, UNVISITED } from '../utils/constants';
import { useSettings } from './useSettings';

export type Position = readonly [number, number];

interface ICell {
  key: number;
  pos: Position;
  state: number;
  walls: [boolean, boolean, boolean, boolean];
}

interface IMazeContext {
  cells: ICell[];
  setCell: (key: number, state: number) => void;
  isCell: (key: number, state: number) => boolean;
  removeWallBetween: (key1: number, key2: number) => void;
  pToKey: ([x, y]: Position) => number;
  kToPos: (key: number) => Position;
  isWithinMaze: (pos: Position) => boolean;
  getRandomCell: () => number;
  getAdjacentCells: (pos: Position) => Position[];
  replaceState: (state1: number, state2: number) => void;
  newMaze: () => void;
}

const MazeContext = createContext<IMazeContext>(null!);

export const MazeProvider = ({ children }: { children: ReactNode }) => {
  const [cells, setCells] = useState<ICell[]>([]);
  const { size, generator, appState } = useSettings();

  useEffect(() => {
    if (appState === NEW) {
      newMaze();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, generator, appState]);

  const setCell = (key: number, state: number) => {
    const temp = [...cells];
    temp[key].state = state;
    setCells([...temp]);
  };

  const isCell = (key: number, state: number) => {
    return cells[key].state === state;
  };

  const removeWallBetween = (key1: number, key2: number) => {
    const temp = [...cells];
    const [x1, y1] = temp[key1].pos;
    const [x2, y2] = temp[key2].pos;
    if (x1 - x2 === 1) {
      temp[key1].walls[TOP] = false;
      temp[key2].walls[BOTTOM] = false;
    } else if (y1 - y2 === 1) {
      temp[key1].walls[LEFT] = false;
      temp[key2].walls[RIGHT] = false;
    } else {
      removeWallBetween(key2, key1);
    }
    setCells([...temp]);
  };

  const newMaze = () => {
    const temp: ICell[] = Array.from(Array(size * size).keys()).map(key => ({
      key,
      pos: kToPos(key),
      state: UNVISITED,
      walls: [true, true, true, true],
    }));
    setCells([...temp]);
  };

  const replaceState = (state1: number, state2: number) => {
    const temp = [...cells];
    temp
      .filter(cell => cell.state === state1)
      .forEach(cell => (cells[cell.key].state = state2));
    setCells([...temp]);
  };

  const pToKey = ([x, y]: Position) => {
    return x * size + y;
  };

  const kToPos = (key: number) => {
    return [Math.floor(key / size), key % size] as Position;
  };

  const isWithinMaze = ([x, y]: Position) => {
    return x >= 0 && x < size && y >= 0 && y < size;
  };

  const getRandomCell = () => {
    return Math.floor(Math.random() * size * size);
  };

  const getAdjacentCells = ([x, y]: Position) => {
    return [
      [x + 1, y] as Position,
      [x - 1, y] as Position,
      [x, y + 1] as Position,
      [x, y - 1] as Position,
    ].filter(pos => isWithinMaze(pos));
  };

  const value = {
    cells,
    setCell,
    isCell,
    removeWallBetween,
    pToKey,
    kToPos,
    isWithinMaze,
    getRandomCell,
    getAdjacentCells,
    replaceState,
    newMaze,
  };

  return <MazeContext.Provider value={value}>{children}</MazeContext.Provider>;
};

export const useMaze = () => useContext(MazeContext);
