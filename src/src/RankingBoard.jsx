import { useEffect, useState } from "react";

function RankingBoard() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("ranking");
    if (stored) {
      setRanking(JSON.parse(stored));
    }
  }, []);

  const handleClearRanking = () => {
    const confirmClear = window.confirm("정말로 랭킹을 초기화할까요?");
    if (confirmClear) {
      localStorage.removeItem("ranking");
      setRanking([]);
    }
  };

  return (
    <div className="RankingBoard">
      <h3>🏆 랭킹</h3>
      {ranking.length === 0 ? (
        <p>아직 기록이 없습니다.</p>
      ) : (
        <ol>
          {ranking
            .sort((a, b) => a.tries - b.tries)
            .map((entry, idx) => (
              <li key={idx}>
                {entry.name} - {entry.tries}회
              </li>
            ))}
        </ol>
      )}

      {/* 초기화 버튼 */}
      <button className="ClearRankingButton" onClick={handleClearRanking}>
        랭킹 초기화
      </button>
    </div>
  );
}

export default RankingBoard;
