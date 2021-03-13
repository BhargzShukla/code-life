import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import "./App.css";

const socket = openSocket(
  `https://warm-brushlands-48090.herokuapp.com:${process.env.PORT ?? 8000}`
);
function App() {
  const [clientCode, setClientCode] = useState("");

  useEffect(() => {
    socket.emit("clientSend", clientCode);
    socket.on("serverSend", (arg) => setClientCode(arg));
    console.log("Code received from server = ", clientCode);
  });

  return (
    <main className="App">
      <h1>Live Coding Session</h1>
      <textarea
        name="live-editor"
        id="live-editor"
        cols="100"
        rows="50"
        onChange={(e) => setClientCode(e.target.value)}
        value={clientCode}
      ></textarea>
    </main>
  );
}

export default App;
