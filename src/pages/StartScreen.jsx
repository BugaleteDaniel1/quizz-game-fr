import { Link } from "react-router-dom";

export const StartScreen = () => {
  return (
    <div>
      <h1>Are You Ready to Test Your Knowledge?</h1>
      <Link className="check-btn" to="/start-game">
        Start
      </Link>
    </div>
  );
};
