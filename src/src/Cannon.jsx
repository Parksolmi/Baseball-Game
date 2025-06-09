import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
// import "./Cannon.css"; // CSS가 포함된 곳

export default function Cannon({ onRestart }) {
  const [width, height] = useWindowSize();

  return (
    <div>
      <Confetti width={width} height={height} />
      <div className="homerun-text">HOMERUN</div>
    </div>
  );
}
