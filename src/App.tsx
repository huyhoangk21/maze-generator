import Legend from './components/Legend';
import Loading from './components/Loading';
import Maze from './components/Maze';
import Settings from './components/Settings';
import { MazeProvider } from './hooks/useMaze';
import { SettingProvider } from './hooks/useSettings';
import MazeLogo from './assets/maze.svg';

const App = () => {
  return (
    <SettingProvider>
      <MazeProvider>
        <Loading />
        <div className='flex flex-col items-center gap-1 py-5'>
          <img src={MazeLogo} alt='Maze' />
          <div className='text-blue-500 font-bold text-2xl text-center mb-4'>
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
