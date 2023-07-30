import { ReactNode } from "react";

// interface AttemptProps {
//   //   attemptsHistory: string[];
//   //   currentAttempt: string;
// }

const GRAY = "#939598";
const YELLOW = "#b59f3b";
const GREEN = "#6aaa64";

const getAllIndexes = (word: string, letter: string) => {
  let bulletIndex = [];

  for (var i = 0; i < word.length; i++) {
    if (word[i] == letter) {
      bulletIndex.push(i);
    }
  }
  return bulletIndex;
};

const getBgColor = (letter: string, index: number, correctWord: string) => {
  if (!correctWord.includes(letter.toUpperCase())) return GRAY;
  if (getAllIndexes(correctWord, letter.toUpperCase()).includes(index))
    return GREEN;
  return YELLOW;
};

const Attempt = ({ content, solved }: { content: string; solved: boolean }) => {
  const cells: ReactNode[] = [];
  for (let i = 0; i < 5; i++) {
    var backgroundColor = "";
    if (solved) {
      backgroundColor = getBgColor(content[i], i, "HELLO");
    }
    const backGroundColorClass = "bg-[" + backgroundColor + "]";
    cells.push(
      <div
        key={i}
        className={`border border-neutral-300 h-16 w-16 flex items-center justify-center text-lg  ${backGroundColorClass}`}
      >
        {content[i] ? content[i].toUpperCase() : ""}
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      {cells.map((_, index) => {
        return cells[index];
      })}
    </div>
  );
};

export default Attempt;
