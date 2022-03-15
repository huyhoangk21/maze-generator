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
  setApp: (value: number) => void;
  sleep: () => Promise<unknown>;
}
const SettingsContext = createContext<ISettingsContext>(null!);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>({
    size: 15,
    delay: 0,
    generator: DFS,
    appState: NEW,
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSettings({
      ...settings,
      [e.target.name]: Number(e.target.value),
      appState: NEW,
    });
  };

  const sleep = () =>
    new Promise(resolve => setTimeout(resolve, settings.delay * 200));

  const setApp = (value: number) => {
    setSettings({ ...settings, appState: value });
  };

  const value = {
    ...settings,
    sleep,
    setApp,
    onChangeHandler,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
export const useSettings = () => useContext(SettingsContext);
