import './App.css'
import { io } from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';

const socket = io("http://localhost:8080");

socket.on('connect', () => {
  console.log("Connected:", socket.id);
});

function App() {
  const x = useRef(0);
  const y = useRef(0);

  const [arrows, setArrows] = useState({});

  useEffect(() => {
    setInterval(() => {
      socket.emit("positions", { x: x.current, y: y.current });
    },100);

  }, []);

  useEffect(() => {
    const handler = (users) => {
      setArrows(users);
    };

    socket.on("updatedPos", handler);
  }, []);

  function movedMouse(e) {
    x.current = e.pageX;
    y.current = e.pageY;
  }

  return (
    <div
      onMouseMove={movedMouse}
      className="w-full h-screen bg-linear-to-t from-15% from-sky-500 to-indigo-500 flex justify-center items-center relative"
    >
      {Object.entries(arrows).map(([id, pos]) => {
        if (id === socket.id) return null;
        if (pos[0] === 0 || pos[1] === 0) return null;

        return (
          <img
            key={id}
            src="/pointer.png"
            alt="pointer"
            style={{
              position: "absolute",
              left: pos[0],
              top: pos[1],
              width: 30,
              height: 30,
              transition: "left 0.15s linear, top 0.15s linear",
            }}
          />
        );
      })}


      <h1 className="text-9xl font-Stalinist font-light">Move</h1>
    </div>
  );
}

export default App;
