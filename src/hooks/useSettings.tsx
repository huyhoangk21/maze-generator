import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { DFS, NEW } from '../utils/constants';

interface SettingsState {
  size: number;
  delay: number;
  generator: number;
  appState: number;
}

interface ISettingsContext extends SettingsState {
  onChangeHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
const SettingsContext = createContext<ISettingsContext>(null!);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>({
    size: 10,
    delay: 0,
    generator: DFS,
    appState: NEW,
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // TODO disable size change when app state !== NEW
    setSettings({ ...settings, [e.target.name]: Number(e.target.value) });
  };

  const value = {
    ...settings,
    onChangeHandler,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
export const useSettings = () => useContext(SettingsContext);
