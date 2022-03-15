import React from 'react';
import { DFS, PRIM, KRUSKAL, WILSON, ALDOUS_BRODER } from '../utils/constants';
import { useSettings } from './useSettings';

const Settings = () => {
  const { size, generator, delay, onChangeHandler } = useSettings();

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
          max={40}
          step={1}
          value={size}
          onChange={onChangeHandler}
          name='size'
          id='size'
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
        >
          {generatorOptions.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className='text-center mt-2 md:mt-0'>
        <button className='uppercase text-white bg-blue-500 py-0.5 px-3'>
          Generate
        </button>
      </div>
    </div>
  );
};

export default Settings;
