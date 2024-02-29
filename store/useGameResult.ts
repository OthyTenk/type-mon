import {
  INITIAL_STATE,
  IResultStatisticStore,
} from "@/hooks/useResultStatistic"
import { create } from "zustand"

interface GameResultStore {
  creator: IResultStatisticStore
  guest: IResultStatisticStore
}

interface IAction {
  setCreator: (data: IResultStatisticStore) => void
  setGuest: (data: IResultStatisticStore) => void
  reset: () => void
}

const useGameResult = create<GameResultStore & IAction>((set) => ({
  creator: INITIAL_STATE,
  guest: INITIAL_STATE,

  setCreator: (data: IResultStatisticStore) =>
    set({
      creator: data,
    }),
  setGuest: (data: IResultStatisticStore) =>
    set({
      guest: data,
    }),
  reset: () =>
    set({
      creator: INITIAL_STATE,
      guest: INITIAL_STATE,
    }),
}))

export default useGameResult
