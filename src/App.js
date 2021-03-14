import React, { useLayoutEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

// eslint-disable-next-line no-unused-vars
const herokuUrl = "https://warm-brushlands-48090.herokuapp.com";
// eslint-disable-next-line no-unused-vars
const localUrl = `http://localhost:${process.env.PORT || 8000}`;

function App() {
  const [clientCode, setClientCode] = useState("");

  const handleKeyDown = (evt) => {
    let value = clientCode,
      selStartPos = evt.currentTarget.selectionStart;

    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "   " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setClientCode(value);
    }
  };

  const clearCode = () => {
    setClientCode("");
  };

  useLayoutEffect(() => {
    const socket = io(herokuUrl);
    setImmediate(async () => {
      await socket.on("serverSend", (arg) => setClientCode(arg));
    }, 100);
    socket.emit("clientSend", clientCode);

    console.log("Server code ", clientCode);

    return () => {
      socket.disconnect();
    };
  });

  return (
    <main className="content">
      <h1>Live Coding Session</h1>
      <fieldset>
        <legend>Input code here</legend>
        <textarea
          name="code-input"
          id="code-input"
          value={clientCode}
          rows="40"
          onChange={(evt) => setClientCode(evt.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
      </fieldset>

      <button onClick={clearCode}>Clear</button>
    </main>
  );
}

export default App;
