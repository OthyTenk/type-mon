import { create } from "zustand"

interface ITypingResultModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useTypingResultModal = create<ITypingResultModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useTypingResultModal
