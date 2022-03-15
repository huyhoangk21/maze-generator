import {
  DFS,
  PRIM,
  KRUSKAL,
  WILSON,
  ALDOUS_BRODER,
  RUNNING,
  STOP,
  NEW,
} from '../utils/constants';
import { useSettings } from '../hooks/useSettings';
import { useDFS } from '../generators/useDFS';
import { usePrim } from '../generators/usePrim';
import { useAldousBroder } from '../generators/useAldousBroder';
import { useWilson } from '../generators/useWilson';
import { useKruskal } from '../generators/useKruskal';

const Settings = () => {
  const { size, generator, delay, appState, setNew, onChangeHandler } =
    useSettings();

  const { dfs } = useDFS();
  const { prim } = usePrim();
  const { aldousBroder } = useAldousBroder();
  const { wilson } = useWilson();
  const { kruskal } = useKruskal();

  const generators = [dfs, kruskal, prim, wilson, aldousBroder];

  const generatorOptions = [
    { key: DFS, value: 'Randomized DFS' },
    { key: KRUSKAL, value: "Randomized Kruskal's" },
    { key: PRIM, value: "Randomized Prim's" },
    { key: WILSON, value: "Wilson's" },
    { key: ALDOUS_BRODER, value: 'Alduous-Broder' },
  ];

  return (
    <div className='flex flex-col gap-2 md:flex-row md:gap-5 md:items-end'>
      <div className='flex flex-col'>
        <label htmlFor='size' className='font-bold'>
          Size: {size}
        </label>
        <input
          type='range'
          min={10}
          max={30}
          step={1}
          value={size}
          onChange={onChangeHandler}
          name='size'
          id='size'
          disabled={appState !== NEW}
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='delay' className='font-bold'>
          Delay: {delay}
        </label>
        <input
          type='range'
          min={0}
          max={0.5}
          step={0.1}
          value={delay}
          onChange={onChangeHandler}
          name='delay'
          id='delay'
          disabled={appState !== NEW}
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='generator' className='font-bold'>
          Generator
        </label>
        <select
          className='border border-black'
          id='generator'
          name='generator'
          value={generator}
          onChange={onChangeHandler}
          disabled={appState !== NEW}
        >
          {generatorOptions.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className='text-center mt-2 md:mt-0 flex gap-5'>
        <button
          className='uppercase text-white bg-blue-500 py-0.5 px-4 disabled:bg-slate-300 disabled:cursor-not-allowed'
          disabled={appState === RUNNING || appState === NEW}
          onClick={() => setNew(NEW)}
        >
          New
        </button>
        <button
          className='uppercase text-white bg-blue-500 py-0.5 px-4 disabled:bg-slate-300 disabled:cursor-not-allowed'
          disabled={appState !== NEW}
          onClick={async () => {
            setNew(RUNNING);
            await generators[generator]();
            setNew(STOP);
          }}
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default Settings;
