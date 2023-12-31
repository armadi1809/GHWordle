import { ReactElement, useEffect, useState } from "react";
import Attempt from "./attempt";

const wordOfTheDay: string = "JASON";
var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};

function App() {
  const [allAttempts, setAllAttempts] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const handleKeyPress = (ev: KeyboardEvent) => {
    if (
      (!isAlpha(ev.key) && ev.key !== "Backspace" && ev.key !== "Enter") ||
      gameOver
    ) {
      return;
    }
    if (isAlpha(ev.key) && currentAttempt.length < wordOfTheDay.length) {
      setCurrentAttempt((prev) => prev + ev.key);
      return;
    }
    if (ev.key === "Backspace") {
      setCurrentAttempt((prev) => prev.substring(0, prev.length - 1));
      return;
    }
    if (ev.key === "Enter") {
      if (currentAttempt.length !== 5) return;
      setAllAttempts((prevAllAttempts) => [...prevAllAttempts, currentAttempt]);
      setCurrentAttempt("");
      if (currentAttempt.toUpperCase() === wordOfTheDay) setGameOver(true);
    }
  };
  const getBlurRate = (attempt: number) => {
    if (gameOver) return "blur-none";
    switch (attempt) {
      case 0:
        return "blur-2xl";
      case 1:
        return "blur-xl";

      case 2:
        return "blur-lg";
      case 3:
        return "blur-md";
      case 4:
        return "blur";
      case 5:
        return "blur-none";
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentAttempt, allAttempts]);
  const rows: ReactElement[] = [];

  for (let i = 0; i < 5; i++) {
    if (i < allAttempts.length) {
      rows.push(<Attempt key={i} solved content={allAttempts[i]} />);
    } else if (i === allAttempts.length) {
      rows.push(<Attempt key={i} solved={false} content={currentAttempt} />);
    } else {
      rows.push(<Attempt key={i} solved={false} content="" />);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-3 w-full items-center">{rows}</div>
      <div className="h-48 w-48">
        <img
          className={`${getBlurRate(allAttempts.length)}`}
          src="../public/jason_wassel.jpg"
          alt="employee_photo"
        />
      </div>
    </div>
  );
}

export default App;
