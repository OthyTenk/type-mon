import { useTyping } from "../state/context";

const Preview = () => {
  const { state } = useTyping();
  const { input, text } = state;

  const previewText = text.split("").map((s, i) => {
    let color = "";
    if (i < input.length) {
      color = s === input[i] ? "green" : "red";
    }
    return (
      <span key={`${s}_${i}`} className={`${color}`}>
        {s}
      </span>
    );
  });

  return <div>{previewText}</div>;
};

export default Preview;
