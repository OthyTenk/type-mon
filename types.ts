export interface StartGame extends PlayerState {
  startTime: number
}

export interface Player {
  id: string
  charPosition: number
  playAgain?: boolean
  disconnected?: boolean
  name: string
}

export interface PlayerState {
  sentence: string
  players: {
    creator: Player
    guest?: Player
  }
}
