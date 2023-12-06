import { create } from "zustand"

interface IIsTypingStore {
  isTyping: boolean
  //   timeLeft: number
  startType: () => void
  stopType: () => void
  //   initTime: (time: number) => void
  //   tick: () => void
}

const useIsTyping = create<IIsTypingStore>((set) => ({
  isTyping: false,
  //   timeLeft: 0,
  startType: () => set({ isTyping: true }),
  stopType: () => set({ isTyping: false }),
  //   initTime: (time) => set({ timeLeft: time }),
  //   tick: () =>
  //     set((state) => ({
  //       timeLeft: state.timeLeft > 0 ? state.timeLeft-- : 0,
  //     })),
}))

export default useIsTyping
