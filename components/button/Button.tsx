import React, {FunctionComponent} from "react";
import "./Button.css";

type Props = {
  value: string;
  handler: Function;
  isOperation?: boolean;
  hovered?: boolean;
};

export default function Button<Props>({
  children,
  value,
  handler,
  isOperation = false,
  hovered = true
}) {
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