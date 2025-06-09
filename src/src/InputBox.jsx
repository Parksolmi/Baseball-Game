import { useState } from "react";

export default function InputBox({ onGuess, disabled }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuess(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength="4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder="숫자 4자리를 입력하세요"
      />
      <button type="submit" disabled={disabled}>
        입력
      </button>
    </form>
  );
}
