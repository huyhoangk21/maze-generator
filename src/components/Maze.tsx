import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { useWidth } from '../hooks/useWidth';

const Maze = () => {
  const { width } = useWidth();
  const { size } = useSettings();

  return (
    <div
      className='border border-black grid mt-5 md:mt-10'
      style={{
        width,
        height: width,
        gridTemplate: `repeat(${size},1fr) / repeat(${size},1fr)`,
      }}
    >
      {Array.from(Array(size * size).keys()).map(key => (
        <div key={key} className='border border-black' />
      ))}
    </div>
  );
};

export default Maze;
