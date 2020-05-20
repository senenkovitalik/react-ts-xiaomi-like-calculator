import React from "react";
import "./Display.css";

class History {
  expr: string;
  res: number;
}

class Props {
  history: History[];
  isMuted: boolean;
  userInput: string;
  result: number|null;
}

export default function display<Props>({history, isMuted, userInput, result}) {
  return (
    <div className="result">
      <div className="result__history">
        {history.map(({ expr, res }, i) => (
          <React.Fragment key={i}>
            <div className={`result__input`}>{expr}</div>
            <div className={`result__current`}>= {res}</div>
            <br />
          </React.Fragment>
        ))}
      </div>

      <div className="result__container">
        <div className={`result__input ${isMuted ? "muted" : ""}`}>
          {userInput}
        </div>
        <div className={`result__current ${isMuted ? "" : "muted"}`}>
          {result ? "=" : null} {result}
        </div>
      </div>
    </div>
  );
}
