import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IGameStore {
  currentUser: string | null
  currentUserId: string
  code: string
}

interface IActions {
  setCurrentUser: (name: string) => void
  setUserInfo: (name: string, id: string) => void
  setGameCode: (code: string) => void
  reset: () => void
}

// Initialize a default state
const INITIAL_STATE: IGameStore = {
  currentUser: "",
  currentUserId: "",
  code: "",
}

const useGame = create(
  persist<IGameStore & IActions>(
    (set) => ({
      currentUser: INITIAL_STATE.currentUser,
      currentUserId: INITIAL_STATE.currentUserId,
      code: INITIAL_STATE.code,
      setCurrentUser: (name) => set({ currentUser: name }),
      setUserInfo: (name, id) => set({ currentUser: name, currentUserId: id }),
      setGameCode: (code) => set({ code: code }),
      reset: () =>
        set({
          currentUser: INITIAL_STATE.currentUser,
          currentUserId: INITIAL_STATE.currentUserId,
          code: INITIAL_STATE.code,
        }),
    }),
    {
      name: "typemon-game-storage",
    }
  )
)

export default useGame
