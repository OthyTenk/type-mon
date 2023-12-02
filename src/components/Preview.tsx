import { FC, ReactElement } from "react";

interface IPreviewProps {
  typingText: string | ReactElement[];
  timeLeft: number;
  mistakes: number;
  WPM: number;
  CPM: number;
  onTryAgain: () => void;
}

const Preview: FC<IPreviewProps> = ({
  typingText,
  timeLeft,
  mistakes,
  WPM,
  CPM,
  onTryAgain,
}) => {
  return (
    <div className="border-neutral-500 border md:rounded-md p-5 md:pt-0">
      <div className="border-b-neutral-500 border-b">
        <p id="paragraph">{typingText}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-1">
        <ul className="flex w-full justify-between items-center m-0 md:w-[calc(100% - 120px)] list-none">
          <li className="my-0 mx-3">
            <p className="m-1 text-xs">Time Left:</p>
            <span className="text-lg">
              <b>{timeLeft}</b>s
            </span>
          </li>
          <li className="my-0 mx-3">
            <p className="m-1 text-xs">Mistakes:</p>
            <span className="text-lg">{mistakes}</span>
          </li>
          <li className="my-0 mx-3">
            <p className="m-1 text-xs">WPM:</p>
            <span className="text-lg">{WPM}</span>
          </li>
          <li className="my-0 mx-3">
            <p className="m-1 text-xs">CPM:</p>
            <span className="text-lg">{CPM}</span>
          </li>
        </ul>
        <button
          onClick={onTryAgain}
          className="mt-3 w-full md:w-auto py-4 px-5 outline-none border-blue-300 cursor-pointer m-1 rounded-md text-neutral-400 transition duration-75 bg-blue-500 hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Preview;
