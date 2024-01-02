import { create } from "zustand"

interface IResultStatisticStore {
  CPM: number
  WPM: number
  mistakes: number
  currentUserEmail: string | null
  setValues: {
    cpm?: number
    wpm?: number
    mistakes?: number
    currentUserEmail?: string | null
  }
}

const useResultStatistic = create<IResultStatisticStore>((set) => ({
  CPM: 0,
  WPM: 0,
  mistakes: 0,
  currentUserEmail: null,
  setValues: ({ cpm = 0, wpm = 0, mistakes = 0, currentUserEmail = "" }) =>
    set({
      CPM: cpm,
      WPM: wpm,
      mistakes: mistakes,
      currentUserEmail: currentUserEmail,
    }),
}))

export default useResultStatistic
