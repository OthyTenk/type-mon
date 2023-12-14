import { create } from "zustand"
import { DEFAULT_TIME } from "../site_settings"

interface IResultStatisticStore {
  CPM: number
  WPM: number
  mistakes: number
  maxTime: number
  currentUserEmail: string | null
  setValues: {
    cpm?: number
    wpm?: number
    mistakes?: number
    maxTime?: number
    currentUserEmail?: string | null
  }
  newMaxTime: (time: number) => void
}

const useResultStatistic = create<IResultStatisticStore>((set) => ({
  CPM: 0,
  WPM: 0,
  mistakes: 0,
  maxTime: DEFAULT_TIME,
  currentUserEmail: null,
  setValues: ({
    cpm = 0,
    wpm = 0,
    mistakes = 0,
    maxTime = 0,
    currentUserEmail = "",
  }) =>
    set({
      CPM: cpm,
      WPM: wpm,
      mistakes: mistakes,
      maxTime: maxTime,
      currentUserEmail: currentUserEmail,
    }),
  newMaxTime: (time) => set({ maxTime: time }),
}))

export default useResultStatistic
