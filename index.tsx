import React, { Component, useState } from "react";
import { render } from "react-dom";
import "./style.css";
import {Button} from './components/button/Button.tsx';
import {ButtonCircle} from './components/buttonCircle/ButtonCircle.tsx';
import Divider from './components/divider/Divider.tsx';

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
          <Divider />
          <div className="numpad">
            <div className="numpad__row">
              <Button value="C" handler={pressButton} />
              <Button value="<-" handler={pressButton} />
              <Button value="%" handler={pressButton} />
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
              <div style={{width: "25%"}}>{''}</div>
              <Button value="0" handler={pressButton} />
              <Button value="," handler={pressButton} />
              <Button value="=" handler={pressButton} hovered={false}>
                <ButtonCircle>=</ButtonCircle>
              </Button>
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
