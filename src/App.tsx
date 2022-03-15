import React from 'react';
import Settings from './components/Settings';

const App = () => {
  return (
    <div className='flex flex-col items-center gap-5 py-10'>
      <div className='text-blue-500 font-bold text-2xl text-center'>
        Maze Generator
      </div>
      <Settings />
    </div>
  );
};

export default App;
