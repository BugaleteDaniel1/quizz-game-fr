import { Link } from "react-router-dom";

export const StartScreen = () => {
  return (
    <div>
      <h1>Are You Ready to Test Your Knowledge?</h1>
      <Link to="/start-game">Start</Link>
    </div>
  );
};
