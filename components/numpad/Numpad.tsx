import React from "react";
import Button from "../components/button/Button";
import ButtonCircle from "./buttonCircle/ButtonCircle";
import "./Numpad.css";

class Props {
  buttonHandler: Function;
}

export default function numpad<Props>({ buttonHandler }) {
  return (
    <div className="numpad">
      <div className="numpad__row">
        <Button value="C" handler={buttonHandler} isOperation />
        <Button value="<-" handler={buttonHandler} isOperation />
        <Button value="%" handler={buttonHandler} isOperation />
        <Button value="/" handler={buttonHandler} isOperation />
      </div>

      <div className="numpad__row">
        <Button value="7" handler={buttonHandler} />
        <Button value="8" handler={buttonHandler} />
        <Button value="9" handler={buttonHandler} />
        <Button value="*" handler={buttonHandler} isOperation />
      </div>

      <div className="numpad__row">
        <Button value="4" handler={buttonHandler} />
        <Button value="5" handler={buttonHandler} />
        <Button value="6" handler={buttonHandler} />
        <Button value="-" handler={buttonHandler} isOperation />
      </div>

      <div className="numpad__row">
        <Button value="1" handler={buttonHandler} />
        <Button value="2" handler={buttonHandler} />
        <Button value="3" handler={buttonHandler} />
        <Button value="+" handler={buttonHandler} isOperation />
      </div>

      <div className="numpad__row">
        <div style={{ width: "25%" }}>{""}</div>
        <Button value="0" handler={buttonHandler} />
        <Button value="," handler={buttonHandler} isOperation />
        <Button value="=" handler={buttonHandler} hovered={false}>
          <ButtonCircle>=</ButtonCircle>
        </Button>
      </div>
    </div>
  );
}
