export default function ResultList({ logs }) {
  return (
    <ul>
      {logs.map((log, idx) => (
        <li key={idx}>
          {log.input} - {log.strike}S {log.ball}B
        </li>
      ))}
    </ul>
  );
}
