import { create } from "zustand"
import { DEFAULT_TIME } from "../site_settings"

interface IResultStatisticStore {
  CPM: number
  WPM: number
  mistakes: number
  maxTime: number
  setValues: { cpm?: number; wpm?: number; mistakes?: number; maxTime?: number }
  newMaxTime: (time: number) => void
}

const useResultStatistic = create<IResultStatisticStore>((set) => ({
  CPM: 0,
  WPM: 0,
  mistakes: 0,
  maxTime: DEFAULT_TIME,
  setValues: ({ cpm = 0, wpm = 0, mistakes = 0, maxTime = 0 }) =>
    set({ CPM: cpm, WPM: wpm, mistakes: mistakes, maxTime: maxTime }),
  newMaxTime: (time) => set({ maxTime: time }),
}))

export default useResultStatistic
