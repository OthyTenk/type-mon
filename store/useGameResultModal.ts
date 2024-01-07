import { create } from "zustand"

interface IGameResultModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useGameResultModal = create<IGameResultModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useGameResultModal
