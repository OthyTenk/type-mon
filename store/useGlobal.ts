import { create } from "zustand"
import { persist } from "zustand/middleware"
import { DEFAULT_LANG, DEFAULT_TIME } from "../site_settings"

interface GlobalStore {
  language: string
  isTyping: boolean
  time: number
}

interface Actions {
  startType: () => void
  stopType: () => void
  changeLanguage: (newLang: string) => void
  newTime: (time: number) => void
}

const INITIAL_STATE: GlobalStore = {
  language: DEFAULT_LANG,
  isTyping: false,
  time: DEFAULT_TIME,
}

const useGlobal = create(
  persist<GlobalStore & Actions>(
    (set) => ({
      language: INITIAL_STATE.language,
      isTyping: INITIAL_STATE.isTyping,
      time: INITIAL_STATE.time,

      startType: () => set({ isTyping: true }),
      stopType: () => set({ isTyping: false }),
      changeLanguage: (newLang) => set({ language: newLang }),
      newTime: (time) => set({ time: time }),
    }),
    {
      name: "type-mon-storage",
    }
  )
)

export default useGlobal
