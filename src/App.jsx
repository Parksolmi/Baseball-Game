import { useEffect, useState } from "react";
import InputBox from "./src/InputBox";
import ResultList from "./src/ResultList";
import Cannon from "./src/Cannon";
import RankingBoard from "./src/RankingBoard";
import "./App.css";

const COUNT = 15;
const STUPID = 20;

const generateAnswer = () => {
  const result = [];
  while (result.length < 4) {
    const num = Math.floor(Math.random() * 10);
    result.push(num);
  }
  return result;
};

function App() {
  const [answer, setAnswer] = useState(generateAnswer());
  const [logs, setLogs] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showMemo, setShowMemo] = useState(false); // ✏️ 메모장 토글 상태
  const [isNameEntered, setIsNameEntered] = useState(false); // 이름 입력 여부

  const handleCorrectAnswer = () => {
    const bat = document.createElement("div");
    bat.className = "bat-swing";
    document.body.appendChild(bat);

    setTimeout(() => {
      document.body.removeChild(bat);
    }, 800);
  };

  const handleGuess = (input) => {
    if (input.length !== 4 || isNaN(input)) {
      alert("4자리 숫자만 입력이 가능합니다.");
      return;
    }

    if (logs.length >= STUPID) {
      alert(`바보 맞네 ㅋ [정답 : ${answer.join("")}]`);
      setIsCorrect(false);
      resetGame();
      return;
    }

    if (logs.length >= COUNT) {
      const tries = logs.length + 1;
      const moreText = "더".repeat(tries - (COUNT + 1));
      const message =
        tries < STUPID
          ? `당신은 ${moreText} 바보입니까? ^^`
          : `바보 맞네 ㅋ [정답 : ${answer.join("")}]`;

      if (tries >= STUPID) {
        alert(message);
        resetGame();
        return;
      } else {
        const retry = window.confirm(message);
        if (retry) {
          resetGame();
          return;
        }
      }
    }

    const inputArr = input.split("").map(Number);
    const answerCopy = [...answer];

    let strike = 0;
    let ball = 0;

    const unmatchedInput = [];
    const unmatchedAnswer = [];

    inputArr.forEach((digit, i) => {
      if (digit === answerCopy[i]) {
        strike++;
      } else {
        unmatchedInput.push(digit);
        unmatchedAnswer.push(answerCopy[i]);
      }
    });

    unmatchedInput.forEach((digit) => {
      const idx = unmatchedAnswer.indexOf(digit);
      if (idx !== -1) {
        ball++;
        unmatchedAnswer[idx] = null;
      }
    });

    const result = { input, strike, ball };
    const nextLogs = [...logs, result];
    setLogs(nextLogs);

    if (strike === 4) {
      setShowMemo(false);
      handleCorrectAnswer();
      triggerFlyingBall();
      const tries = logs.length + 1;
      setTimeout(() => {
        setIsCorrect(true);
      }, 500);

      setTimeout(() => {
        const name = window.prompt("🎉 정답입니다! 이름을 입력하세요:", "익명");

        if (name) {
          const stored = localStorage.getItem("ranking");
          const ranking = stored ? JSON.parse(stored) : [];
          ranking.push({ name, tries });
          localStorage.setItem("ranking", JSON.stringify(ranking));
        }

        // ✅ 이름 입력 이후에만 다시 시작 버튼 보이도록
        setIsNameEntered(true);
      }, 2000);
    }
  };

  const resetGame = () => {
    window.location.href = "/";
  };

  const triggerFlyingBall = () => {
    const ball = document.createElement("div");
    ball.className = "fly-ball";
    ball.style.top = `${window.innerHeight - 100}px`;
    ball.style.left = `50px`;
    document.body.appendChild(ball);

    setTimeout(() => {
      ball.remove();
    }, 1000);
  };

  return (
    <div className="GameWrapper">
      {/* 랭킹 */}
      <div className="SideContainer">
        <RankingBoard />
      </div>
      {/* 중앙 게임 UI */}
      <div className="GameContainer">
        <div className="HintSection">
          <button onClick={() => setShowHint(!showHint)}>
            {showHint ? "정답 숨기기" : "정답 보기"}
          </button>
          {showHint && <p className="HintText">정답: {answer.join("")}</p>}
        </div>

        <h1>⚾ 숫자 야구 게임 ⚾</h1>
        <InputBox onGuess={handleGuess} disabled={isCorrect} />
        <ResultList logs={logs} />
        {isCorrect && <Cannon />}
        {isCorrect && isNameEntered && (
          <button className="restart-button" onClick={resetGame}>
            다시 시작하기
          </button>
        )}
      </div>

      {/* ✏️ 메모장 토글 버튼 */}
      <button
        className="MemoToggleButton"
        onClick={() => setShowMemo(!showMemo)}
      >
        ✏️
      </button>

      {/* 메모장 영역 */}
      {showMemo && (
        <div className="MemoSection">
          <h3>📝 메모장</h3>
          <textarea
            className="MemoTextarea"
            rows={20}
            placeholder="여기에 자유롭게 메모하세요..."
          />
        </div>
      )}
    </div>
  );
}

export default App;
