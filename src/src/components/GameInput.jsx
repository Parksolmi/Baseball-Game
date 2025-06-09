import { useState } from "react";

function GameInput({ onGuess }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length !== 4 || new Set(input).size !== 4 || /\D/.test(input)) {
      alert("4자리 중복 없는 숫자를 입력하세요!");
      return;
    }
    onGuess(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="4자리 숫자"
      />
      <button type="submit">제출</button>
    </form>
  );
}

export default GameInput;
