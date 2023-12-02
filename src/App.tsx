import Preview from "./components/Preview";
import SpeedInfo from "./components/SpeedInfo";
import UserInput from "./components/UserInput";
import { TypingProvider } from "./state";

function App() {
  return (
    <div className="bg-blue-[#3d3d3d] text-neutral-600">
      <h1>Typing speed test</h1>
      <div className="flex flex-row">
        <TypingProvider>
          <div className="typing-test">
            <Preview />
            <UserInput />
          </div>
          <SpeedInfo />
        </TypingProvider>
      </div>
    </div>
  );
}

export default App;
