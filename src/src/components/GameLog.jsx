function GameLog({ history }) {
  return (
    <div className="log">
      {history.map((item, idx) => (
        <div key={idx}>
          {item.guess} → {item.result}
        </div>
      ))}
    </div>
  );
}

export default GameLog;
