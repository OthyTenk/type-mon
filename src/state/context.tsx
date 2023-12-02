import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

import { Action, ActionTypes, State, initialState, reducer } from "./state";

export const TypingContext = createContext<
  [State, Dispatch<Action<string | number>>]
>([initialState, () => {}]);

interface ITypingProviderProps {
  children: ReactNode;
}
export const TypingProvider: FC<ITypingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TypingContext.Provider value={[state, dispatch]}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTyping = () => {
  const [state, dispatch] = useContext(TypingContext);

  const onInput = (value: string) => {
    if (!state.timerId) {
      startTimer();
    }
    if (state.input.length >= state.text.length && state.timerId) {
      stopTimer();
    }

    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: value });
  };

  const startTimer = () => {
    const timerId = setInterval(
      () => dispatch({ type: ActionTypes.TICK }),
      1000
    );
    dispatch({ type: ActionTypes.SET_TIMER, payload: timerId });
  };

  const stopTimer = () => {
    clearInterval(state.timerId);
    dispatch({ type: ActionTypes.SET_TIMER });
  };

  const tryAgain = () => {
    stopTimer();
    dispatch({ type: ActionTypes.RESTART });
  };

  return { state, onInput, tryAgain };
};
