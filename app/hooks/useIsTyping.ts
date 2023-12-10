import { create } from "zustand"
import { DEFAULT_LANG } from "../site_settings"

interface IIsTypingStore {
  isTyping: boolean
  currentLanguage: string
  startType: () => void
  stopType: () => void
  changeLanguage: (newLang: string) => void
}

const useIsTyping = create<IIsTypingStore>((set) => ({
  isTyping: false,
  currentLanguage: DEFAULT_LANG,
  startType: () => set({ isTyping: true }),
  stopType: () => set({ isTyping: false }),
  changeLanguage: (newLang) => set({ currentLanguage: newLang }),
}))

export default useIsTyping
