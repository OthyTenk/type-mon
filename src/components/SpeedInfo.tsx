import { useTyping } from "../state/context";
import { wpm } from "../utils";

const SpeedInfo = () => {
  const { state, tryAgain } = useTyping();
  const { seconds, characters } = state;

  return (
    <div className="typing-speed">
      <div>Typing speed: {seconds}</div>
      <div>WPM: {wpm(characters, seconds)}</div>
      <div>Correct characters: {characters}</div>
      <div>Mistakes: {0}</div>
      <button onClick={() => tryAgain()}>Try again</button>
    </div>
  );
};

export default SpeedInfo;
