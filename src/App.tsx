import React from 'react';
import Legend from './components/Legend';
import Loading from './components/Loading';
import Maze from './components/Maze';
import Settings from './components/Settings';
import { MazeProvider } from './hooks/useMaze';
import { SettingProvider } from './hooks/useSettings';

const App = () => {
  return (
    <SettingProvider>
      <MazeProvider>
        <Loading />
        <div className='flex flex-col items-center gap-5 py-10'>
          <div className='text-blue-500 font-bold text-2xl text-center mb-2'>
            Maze Generator
          </div>
          <Settings />
          <Legend />
          <Maze />
        </div>
      </MazeProvider>
    </SettingProvider>
  );
};

export default App;
