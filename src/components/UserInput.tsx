import { useTyping } from "../state/context";

const UserInput = () => {
  const { state, onInput } = useTyping();
  const { input } = state;

  return (
    <textarea
      value={input}
      className="text-neutral-900"
      onChange={(e) => onInput(e.target.value)}
    />
  );
};

export default UserInput;
