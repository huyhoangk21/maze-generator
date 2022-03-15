import React from 'react';
import Legend from './components/Legend';
import Maze from './components/Maze';
import Settings from './components/Settings';
import { SettingProvider } from './hooks/useSettings';

const App = () => {
  return (
    <SettingProvider>
      <div className='flex flex-col items-center gap-5 py-10'>
        <div className='text-blue-500 font-bold text-2xl text-center'>
          Maze Generator
        </div>
        <Settings />
        <Legend />
        <Maze />
      </div>
    </SettingProvider>
  );
};

export default App;
