export default function ResultList({ logs }) {
  return (
    <ol>
      {logs.map((log, idx) => (
        <li key={idx}>
          {log.input} - {log.strike}S {log.ball}B
        </li>
      ))}
    </ol>
  );
}
