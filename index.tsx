import React, { Component, useState } from "react";
import { render } from "react-dom";
import "./style.css";
import { Button } from "./components/button/Button";
import { ButtonCircle } from "./components/buttonCircle/ButtonCircle";
import Divider from "./components/divider/Divider";

function App() {
  const [userInput, setUserInput] = useState("");

  const buttonsMap = {
    0: {
      title: "0",
      value: 0
    },
    1: {
      title: "1",
      value: 1
    },
    2: {
      title: "2",
      value: 2
    },
    3: {
      title: "3",
      value: 3
    },
    4: {
      title: "4",
      value: 4
    },
    5: {
      title: "5",
      value: 5
    },
    6: {
      title: "6",
      value: 6
    },
    7: {
      title: "7",
      value: 7
    },
    8: {
      title: "8",
      value: 8
    },
    9: {
      title: "9",
      value: 9
    },
    10: {
      title: "C",
      value: "CLEAR_ALL"
    },
    11: {
      title: "<-",
      value: "BACKSPACE"
    },
    12: {
      title: "%",
      value: "PERCENT"
    },
    13: {
      title: "/",
      value: "DIVISION"
    },
    14: {
      title: "X",
      value: "MULTIPLICATION"
    },
    15: {
      title: "-",
      value: "MINUS"
    },
    16: {
      title: "+",
      value: "PLUS"
    },
    17: {
      title: ",",
      value: "PERIOD"
    }
  };

  return (
    <div className="phone">
      <div className="phone__container">
        <div className="status-bar">00:00</div>
        <div className="calculator">
          <div className="result">
            <div className="result__history" />
            <div className="result__container">
              <div className="result__input">{userInput}</div>
              <div className="result__current">= 2323</div>
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
  }

  function checkIsInputAllowed(currentVal: string): boolean {
    const prevVal = userInput.charAt(userInput.length - 1);
    const isPrevValSign = isNaN(parseInt(prevVal, 10));
    const isCurrentValSign = isNaN(parseInt(currentVal, 10));
    return !(isPrevValSign && isCurrentValSign);
  }
}

render(<App />, document.getElementById("root"));
