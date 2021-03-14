import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import "./App.css";

const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://warm-brushlands-48090.herokuapp.com";
const socket = openSocket(serverUrl);
function App() {
  const [clientCode, setClientCode] = useState(
    window.localStorage.getItem("clientCode") || ""
  );

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

  useEffect(() => {
    (async () => {
      await socket.emit("clientSend", clientCode);
      await socket.on("serverSend", (arg) => setClientCode(arg));
    })();
    window.localStorage.setItem("clientCode", clientCode);
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

      <button onClick={() => setClientCode("")}>Clear</button>
    </main>
  );
}

export default App;
