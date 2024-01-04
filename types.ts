export interface StartGame {
  startTime: number
  sentence: string
  creator: Player
  guest?: Player
}

export interface Player {
  id: string
  charPosition: number
  playAgain?: boolean
  disconnected?: boolean
  name: string
}
