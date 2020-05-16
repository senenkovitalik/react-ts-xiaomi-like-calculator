import React, { Component, useState } from "react";
import { render } from "react-dom";
import "./style.css";

function App() {
  const [userInput, setUserInput] = useState(null);

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
          <div className="divider">
            <div />
          </div>
          <div className="numpad">
            <div className="numpad__row">
              <div className="numpad__col numpad__col_orange">C</div>
              <div className="numpad__col numpad__col_orange">{"<-"}</div>
              <div className="numpad__col numpad__col_orange">%</div>
              <div className="numpad__col numpad__col_orange">/</div>
            </div>

            <div className="numpad__row">
              <div className="numpad__col">7</div>
              <div className="numpad__col">8</div>
              <div className="numpad__col">9</div>
              <div className="numpad__col numpad__col_orange">X</div>
            </div>

            <div className="numpad__row">
              <div className="numpad__col">4</div>
              <div className="numpad__col">5</div>
              <div className="numpad__col">6</div>
              <div className="numpad__col numpad__col_orange">-</div>
            </div>

            <div className="numpad__row">
              <div className="numpad__col" onClick={e => pressButton(1)}>
                1
              </div>
              <div className="numpad__col" onClick={e => pressButton(2)}>
                2
              </div>
              <div className="numpad__col" onClick={e => pressButton(3)}>
                3
              </div>
              <div
                className="numpad__col numpad__col_orange"
                onClick={e => pressButton("+")}
              >
                +
              </div>
            </div>

            <div className="numpad__row">
              <div className="numpad__col" />
              <div className="numpad__col">0</div>
              <div className="numpad__col numpad__col_orange">,</div>
              <div className="numpad__col">
                <div className="button-circle">=</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function pressButton(val: number | string) {
    setUserInput(val);
  }
}

render(<App />, document.getElementById("root"));
