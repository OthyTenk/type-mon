import { create } from "zustand"
import { persist } from "zustand/middleware"

interface IGameStore {
  currentUser: string | null
  currentUserId: string
  code: string
  creatorCode: string
  joinCode: string
}

interface IActions {
  setCurrentUser: (name: string) => void
  setUserInfo: (name: string, id: string) => void
  setGameCode: (code: string) => void
  setGameCreatorCode: (code: string) => void
  setJoinCode: (code: string) => void
  reset: () => void
}

// Initialize a default state
const INITIAL_STATE: IGameStore = {
  currentUser: "",
  currentUserId: "",
  code: "",
  creatorCode: "",
  joinCode: "",
}

const useGame = create(
  persist<IGameStore & IActions>(
    (set) => ({
      currentUser: INITIAL_STATE.currentUser,
      currentUserId: INITIAL_STATE.currentUserId,
      code: INITIAL_STATE.code,
      creatorCode: INITIAL_STATE.creatorCode,
      joinCode: INITIAL_STATE.joinCode,

      setCurrentUser: (name) => set({ currentUser: name }),
      setUserInfo: (name, id) => set({ currentUser: name, currentUserId: id }),
      setGameCode: (code) => set({ code: code }),
      setGameCreatorCode: (code) => set({ creatorCode: code }),
      setJoinCode: (code) => set({ joinCode: code }),
      reset: () =>
        set({
          currentUser: INITIAL_STATE.currentUser,
          currentUserId: INITIAL_STATE.currentUserId,
          code: INITIAL_STATE.code,
          creatorCode: INITIAL_STATE.creatorCode,
          joinCode: INITIAL_STATE.joinCode,
        }),
    }),
    {
      name: "typemon-game-storage",
    }
  )
)

export default useGame
