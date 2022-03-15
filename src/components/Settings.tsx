import React from 'react';
import { DFS, PRIM, KRUSKAL, WILSON, ALDOUS_BRODER } from '../utils/constants';

const Settings = () => {
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
          Size
        </label>
        <input
          type='range'
          min={10}
          max={40}
          step={1}
          // value={delay}
          // onChange={onChangeHandler}
          name='size'
          id='size'
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='speed' className='font-bold'>
          Speed
        </label>
        <input
          type='range'
          min={1}
          max={5}
          step={1}
          // value={delay}
          // onChange={onChangeHandler}
          name='speed'
          id='speed'
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='generator' className='font-bold'>
          Generator
        </label>
        <select id='generator' name='generator' className='border border-black'>
          {generatorOptions.map(({ key, value }) => (
            <option value={key}>{value}</option>
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
