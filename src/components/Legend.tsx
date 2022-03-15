import React from 'react';
import { useSettings } from '../hooks/useSettings';

const Legend = () => {
  const { generator } = useSettings();

  const legendOptions = ['backtrack', 'outer', '', 'random walk', ''];

  return (
    <div className='flex gap-0.5 mt-5 mb-2 sm:gap-5'>
      <div className='flex gap-1'>
        <div className='bg-gray-600 h-5 w-5 border border-black' />
        <div>unvisited</div>
      </div>
      <div className='flex gap-1'>
        <div className='bg-white h-5 w-5 border border-black' />
        <div>visited</div>
      </div>
      <div className='flex gap-1'>
        <div className='bg-blue-500 h-5 w-5 border border-black' />
        <div>current</div>
      </div>
      {legendOptions[generator] && (
        <div className='flex gap-1'>
          <div className='bg-orange-400 h-5 w-5 border border-black' />
          <div>{legendOptions[generator]}</div>
        </div>
      )}
    </div>
  );
};

export default Legend;
