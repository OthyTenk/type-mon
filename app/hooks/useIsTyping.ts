import { create } from "zustand"

interface IIsTypingStore {
  isTyping: boolean
  startType: () => void
  stopType: () => void
}

const useIsTyping = create<IIsTypingStore>((set) => ({
  isTyping: false,
  startType: () => set({ isTyping: true }),
  stopType: () => set({ isTyping: false }),
}))

export default useIsTyping
