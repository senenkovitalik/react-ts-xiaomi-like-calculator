import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import "./style.css";
import StatusBar from "./components/status-bar/StatusBar";
import Display from "./components/display/Display";
import Divider from "./components/divider/Divider";
import Numpad from "./components/numpad/Numpad";
import math from "mathjs";

class History {
  expr: string;
  res: number;
}

function App() {
  const [result, setResult] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [resultMuted, muteResult] = useState(false);
  const [willHistoryUpdate, setHistoryUpdateState] = useState(false);
  const [history, updateHistory] = useState<History[]>([]);

  return (
    <div className="phone">
      <div className="phone__container">
        <StatusBar />

        <div className="calculator">
          <Display
            history={history}
            isMuted={resultMuted}
            userInput={userInput}
            result={result}
          />

          <Divider />

          <Numpad buttonHandler={pressButton} />
        </div>
      </div>
    </div>
  );

  function pressButton(val: string): void {
    let isHistoryUpdated = false;
    let expr;

    if (willHistoryUpdate && !["C", "=", "<-"].includes(val)) {
      updateHistory([
        ...history,
        {
          expr: userInput,
          res: result
        }
      ]);

      isHistoryUpdated = true;
      setHistoryUpdateState(false);
      muteResult(false);
    }

    switch (val) {
      case "C":
        setUserInput("");
        setResult(null);
        setHistoryUpdateState(false);
        break;
      case "<-":
        if (!willHistoryUpdate) {
          expr = userInput.slice(0, userInput.length - 1);
          setUserInput(expr);
          evaluate(expr);
        }
        break;
      case "%":
        const regex = /\d+$/g;
        const matches = userInput.match(regex);

        if (matches.length) {
          const transformedValue = parseInt(matches[0], 10) / 100;
          expr = userInput.replace(regex, transformedValue.toString());
          setUserInput(expr);
          evaluate(expr);
        }

        break;
      case "=":
        muteResult(true);
        setHistoryUpdateState(true);
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        if (willHistoryUpdate) {
          expr = result.toString().concat(val);
          setUserInput(expr);
          evaluate(expr);
          break;
        }
      default:
        if (checkIsInputAllowed(val)) {
          expr = isHistoryUpdated
            ? val
            : userInput.concat(val);
          setUserInput(expr);
          evaluate(expr);
        }
    }
  }

  function checkIsInputAllowed(currentVal: string): boolean {
    const prevVal = userInput.charAt(userInput.length - 1);
    const isPrevValSign = isNaN(parseInt(prevVal, 10));
    const isCurrentValSign = isNaN(parseInt(currentVal, 10));
    return !(isPrevValSign && isCurrentValSign);
  }

  function evaluate(expression: string) {
    const lastChar = expression.charAt(expression.length - 1);
    const isSign = isNaN(parseInt(lastChar, 10));
    const toEval = isSign
      ? expression.slice(0, expression.length - 1)
      : expression;
    const res = math.evaluate(toEval);

    setResult(res);
  }
}

render(<App />, document.getElementById("root"));
