import React from 'react';
import Settings from './components/Settings';
import { SettingProvider } from './components/useSettings';

const App = () => {
  return (
    <SettingProvider>
      <div className='flex flex-col items-center gap-5 py-10'>
        <div className='text-blue-500 font-bold text-2xl text-center'>
          Maze Generator
        </div>
        <Settings />
      </div>
    </SettingProvider>
  );
};

export default App;
