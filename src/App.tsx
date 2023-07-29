import { ReactElement, useEffect, useState } from "react";
import Attempt from "./attempt";

const wordOfTheDay: string = "HELLO";
var isAlpha = function (ch: string) {
  return /^[A-Z]$/i.test(ch);
};
function App() {
  const [allAttempts, setAllAttempts] = useState<string[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<string>("");
  const handleKeyPress = (ev: KeyboardEvent) => {
    if (!isAlpha(ev.key) && ev.key !== "Backspace" && ev.key !== "Enter") {
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
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentAttempt, allAttempts]);
  const rows: ReactElement[] = [];

  for (let i = 0; i < 5; i++) {
    if (i < allAttempts.length) {
      rows.push(<Attempt content={allAttempts[i]} />);
    } else if (i === allAttempts.length) {
      rows.push(<Attempt content={currentAttempt} />);
    } else {
      rows.push(<Attempt content="" />);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-3 w-full items-center">{rows}</div>
    </div>
  );
}

export default App;
