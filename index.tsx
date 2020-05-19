import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import "./style.css";
import StatusBar from "./components/status-bar/StatusBar";
import { Button } from "./components/button/Button";
import { ButtonCircle } from "./components/buttonCircle/ButtonCircle";
import Divider from "./components/divider/Divider";
import math from "mathjs";

class History {
  expr: string;
  res: number;
}

function App() {
  const [result, setResult] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [resultMuted, muteResult] = useState(false);
  const [history, updateHistory] = useState<History[]>([]);

  return (
    <div className="phone">
      <div className="phone__container">
        <StatusBar />

        <div className="calculator">
          <div className="result">
            <div className="result__history">
              {history.map(({ expr, res }) => (
                <React.Fragment>
                  <div className={`result__input`}>{expr}</div>
                  <div className={`result__current`}>= {res}</div>
                  <br />
                </React.Fragment>
              ))}
            </div>

            <div className="result__container">
              <div className={`result__input ${resultMuted ? "muted" : ""}`}>
                {userInput}
              </div>
              <div className={`result__current ${resultMuted ? "" : "muted"}`}>
                {result ? "=" : null} {result}
              </div>
            </div>
          </div>

          <Divider />

          <div className="numpad">
            <div className="numpad__row">
              <Button value="C" handler={pressButton} isOperation />
              <Button value="<-" handler={pressButton} isOperation />
              <Button value="%" handler={pressButton} isOperation />
              <Button value="/" handler={pressButton} isOperation />
            </div>

            <div className="numpad__row">
              <Button value="7" handler={pressButton} />
              <Button value="8" handler={pressButton} />
              <Button value="9" handler={pressButton} />
              <Button value="*" handler={pressButton} isOperation />
            </div>

            <div className="numpad__row">
              <Button value="4" handler={pressButton} />
              <Button value="5" handler={pressButton} />
              <Button value="6" handler={pressButton} />
              <Button value="-" handler={pressButton} isOperation />
            </div>

            <div className="numpad__row">
              <Button value="1" handler={pressButton} />
              <Button value="2" handler={pressButton} />
              <Button value="3" handler={pressButton} />
              <Button value="+" handler={pressButton} isOperation />
            </div>

            <div className="numpad__row">
              <div style={{ width: "25%" }}>{""}</div>
              <Button value="0" handler={pressButton} />
              <Button value="," handler={pressButton} isOperation />
              <Button value="=" handler={pressButton} hovered={false}>
                <ButtonCircle>=</ButtonCircle>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function pressButton(val: string): void {
    let expr;

    switch (val) {
      case "C":
        setUserInput("");
        setResult(null);
        break;
      case "<-":
        expr = userInput.slice(0, userInput.length - 1);
        setUserInput(expr);
        evaluate(expr);
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
      case "/":
      case "*":
      case "-":
      case "+":
      default:
        if (checkIsInputAllowed(val)) {
          expr = userInput.concat(val);
          setUserInput(expr);
          evaluate(expr);
        }
    }

    muteResult(val === "=");
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
