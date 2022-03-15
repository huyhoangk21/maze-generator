import { useSettings } from '../hooks/useSettings';
import { RUNNING } from '../utils/constants';

const Loading = () => {
  const { appState } = useSettings();
  if (appState !== RUNNING) return null;
  return <div className='fixed h-2 inset-x-0 bg-blue-500 animate-pulse'></div>;
};

export default Loading;
