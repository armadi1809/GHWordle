import { ReactNode } from "react";

// interface AttemptProps {
//   //   attemptsHistory: string[];
//   //   currentAttempt: string;
// }

const Attempt = ({ content }: { content: string }) => {
  const cells: ReactNode[] = [];
  for (let i = 0; i < 5; i++) {
    cells.push(
      <div className="border border-neutral-300 h-16 w-16 flex items-center justify-center text-lg">
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
