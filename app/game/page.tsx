import Client from "@/components/Client"
import GameMode from "@/components/game/GameMode"

const prefix = [
  "dragon",
  "cow",
  "cat",
  "dog",
  "tiger",
  "leon",
  "sheep",
  "black",
  "yellow",
  "fat",
  "red",
  "devil",
  "bad",
]
const names = [
  "dorj",
  "bat",
  "tsoomoo",
  "gonchig",
  "gotov",
  "sambuu",
  "damdin",
  "tsetseg",
  "gochoo",
  "tugjil",
]

const GamePage = () => {
  const randomPrefix = Math.floor(Math.random() * prefix.length)
  const randomName = Math.floor(Math.random() * names.length)
  const generateCurrentUser = `${prefix[randomPrefix]} ${names[randomName]}`

  return (
    <div className="mt-32">
      <Client>
        <GameMode userName={generateCurrentUser} />
      </Client>
    </div>
  )
}

export default GamePage
