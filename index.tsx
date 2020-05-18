import React, { Component, useState } from "react";
import { render } from "react-dom";
import "./style.css";
import { Button } from "./components/button/Button";
import { ButtonCircle } from "./components/buttonCircle/ButtonCircle";
import Divider from "./components/divider/Divider";
import math from "mathjs";

function App() {
  const [result, setResult] = useState(0);
  const [userInput, setUserInput] = useState("");

  return (
    <div className="phone">
      <div className="phone__container">
        <div className="status-bar">00:00</div>
        <div className="calculator">
          <div className="result">
            <div className="result__history" />
            <div className="result__container">
              <div className="result__input">{userInput}</div>
              <div className="result__current">= {result}</div>
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
              <Button value="X" handler={pressButton} isOperation />
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
              <Button value="=" handler={evaluate} hovered={false}>
                <ButtonCircle>=</ButtonCircle>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function pressButton(val: string): void {
    switch (val) {
      case "C":
        setUserInput("");
        break;
      case "<-":
        setUserInput(userInput.slice(0, userInput.length - 1));
        break;
      case "%":
        break;
      case "=":
        break;
      case "/":
      case "X":
      case "-":
      case "+":
      case ",":
      default:
        if (checkIsInputAllowed(val)) {
          setUserInput(userInput.concat(val));
        }
    }

    evaluate();
  }

  function checkIsInputAllowed(currentVal: string): boolean {
    const prevVal = userInput.charAt(userInput.length - 1);
    const isPrevValSign = isNaN(parseInt(prevVal, 10));
    const isCurrentValSign = isNaN(parseInt(currentVal, 10));
    return !(isPrevValSign && isCurrentValSign);
  }

  function evaluate() {
    const lastChar = userInput.charAt(userInput.length - 1);
    const isSign = isNaN(parseInt(lastChar, 10));
    let res;

    if (isSign) {
      res = math.evaluate(userInput.slice(0, userInput.length - 1));
    } else {
      res = math.evaluate(userInput);
    }

    setResult(res);
  }
}

render(<App />, document.getElementById("root"));
