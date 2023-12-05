import { create } from "zustand"

interface IResultStatisticStore {
  CPM: number
  WPM: number
  mistakes: number
  maxTime: number
  setValues: { cpm?: number; wpm?: number; mistakes?: number; maxTime?: number }
}

const useResultStatistic = create<IResultStatisticStore>((set) => ({
  CPM: 0,
  WPM: 0,
  mistakes: 0,
  maxTime: 0,
  setValues: ({ cpm = 0, wpm = 0, mistakes = 0, maxTime = 0 }) =>
    set({ CPM: cpm, WPM: wpm, mistakes: mistakes, maxTime: maxTime }),
}))

export default useResultStatistic