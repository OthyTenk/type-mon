import { create } from "zustand"

export interface IResultStatisticStore {
  CPM: number
  WPM: number
  mistakes: number
  currentUserEmail: string | null
  time?: number
}

export interface IAction {
  setValues: {
    cpm?: number
    wpm?: number
    mistakes?: number
    currentUserEmail?: string | null
    time?: number
  }
  reset: () => void
}

export const INITIAL_STATE: IResultStatisticStore = {
  CPM: 0,
  WPM: 0,
  mistakes: 0,
  currentUserEmail: null,
  time: 0,
}

const useResultStatistic = create<IResultStatisticStore & IAction>((set) => ({
  CPM: INITIAL_STATE.CPM,
  WPM: INITIAL_STATE.WPM,
  mistakes: INITIAL_STATE.mistakes,
  currentUserEmail: INITIAL_STATE.currentUserEmail,
  time: INITIAL_STATE.time,

  setValues: ({
    cpm = 0,
    wpm = 0,
    mistakes = 0,
    currentUserEmail = "",
    time = 0,
  }) =>
    set({
      CPM: cpm,
      WPM: wpm,
      mistakes: mistakes,
      currentUserEmail: currentUserEmail,
      time,
    }),
  reset: () =>
    set({
      CPM: INITIAL_STATE.CPM,
      WPM: INITIAL_STATE.WPM,
      mistakes: INITIAL_STATE.mistakes,
      currentUserEmail: INITIAL_STATE.currentUserEmail,
      time: INITIAL_STATE.time,
    }),
}))

export default useResultStatistic
