import { countCorrectCharacters } from "../utils";

export interface State {
  text: string;
  input: string;
  characters: number;
  seconds: number;
  timerId?: number;
}

export const initialState: State = {
  text: "In this video we create a typing test application",
  input: "",
  characters: 0,
  seconds: 0,
  timerId: undefined,
};

export enum ActionTypes {
  CHANGE_INPUT,
  SET_TIMER,
  TICK,
  RESTART,
}

export interface Action<T> {
  type: ActionTypes;
  payload?: T;
}

type Reducer<T = unknown> = (state: State, payload?: T) => State;
type Transducer = (
  state: State,
  //   action: Action<unknown>
  action: Action<string | number>
) => State;

export const changeInput: Reducer<string> = (state, input = "") => ({
  ...state,
  input,
  characters: countCorrectCharacters(state.text, state.input),
});

export const setTimer: Reducer<number> = (state, timerId) => ({
  ...state,
  timerId,
});

export const reStart: Reducer = (state) => ({
  ...state,
});

export const tick: Reducer = (state) => ({
  ...state,
  seconds: state.seconds + 1,
});

export const reducer: Transducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_INPUT:
      return changeInput(state, action.payload as string);
    case ActionTypes.SET_TIMER:
      return setTimer(state, action.payload as number);
    case ActionTypes.TICK:
      return tick(state);
    case ActionTypes.RESTART:
      return reStart(initialState);
    default:
      return state;
  }
};
