import "./App.css";
import { Route, Routes } from "react-router-dom";
import { StartScreen } from "./pages/Home";
import { Game } from "./pages/Game";
import { useGlobalContext } from "./context";
import { useEffect } from "react";

function App() {
  const { isLoaded } = useGlobalContext();

  return <Game />;
  // return (
  //   <Routes>
  //     <Route path="/" element={<StartScreen />} />
  //     <Route path="/start-game" element={<Game />} />
  //   </Routes>
  // );
}

export default App;
