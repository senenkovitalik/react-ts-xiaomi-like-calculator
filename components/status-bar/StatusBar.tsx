import React, { useState, useEffect } from "react";
import "./StatusBar.css";

export default function statusBar() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const d = new Date();
      const time = d.toLocaleTimeString();

      setClock(time);
    }, 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div className="status-bar">
      <div className="status-bar__clock">{clock}</div>
      <div className="status-bar__notifications"></div>
    </div>
  );
}
