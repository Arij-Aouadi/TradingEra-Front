import { createContext, useContext } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children, onStartTimer, isTimerOn }) => {
  return (
    <TimerContext.Provider value={{ onStartTimer, isTimerOn }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  return useContext(TimerContext);
};
