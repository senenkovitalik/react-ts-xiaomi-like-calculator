import React from "react";
import "./Button.css";

export function Button({ children, value, handler, isOperation = false, hovered = true }) {
  const classes = ["numpad__button"];

  if (isOperation) {
    classes.push("numpad__button_orange");
  }

  if (hovered) {
    classes.push("numpad__button_hovered");
  }

  const classesJoined = classes.join(" ");

  return (
    <div className={classesJoined} onClick={_ => handler(value)}>
      {children ? children : value}
    </div>
  );
}
