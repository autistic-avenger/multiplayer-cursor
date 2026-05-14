import './App.css'
import { io } from 'socket.io-client'
import { useEffect, useRef, useState, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { AnimatePresence, motion } from 'framer-motion';

import JoinScreen from './components/JoinScreen';
import Cursor from './components/Cursor';
import ClickEffect from './components/ClickEffect';
import UserList from './components/UserList';

const socket = io("http://localhost:8080");

function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});
  const [clicks, setClicks] = useState([]);

  const handleJoin = (userData) => {
    setCurrentUser(userData);
    setIsJoined(true);
    socket.emit("join", userData);
  };

  const throttledEmit = useCallback(
    throttle((pos) => {
      socket.emit("positions", pos);
    }, 50),
    []
  );

  const handleMouseMove = (e) => {
    if (!isJoined) return;
    throttledEmit({ x: e.pageX, y: e.pageY });
  };

  const handleClick = (e) => {
    if (!isJoined) return;
    socket.emit("click", { x: e.pageX, y: e.pageY });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("updatedUsers", (allUsers) => {
      setUsers(allUsers);
    });

    socket.on("updatedPos", (data) => {
      setUsers((prev) => {
        if (!prev[data.id]) return prev;
        return {
          ...prev,
          [data.id]: {
            ...prev[data.id],
            x: data.x,
            y: data.y,
          },
        };
      });
    });

    socket.on("userClicked", (data) => {
      const clickId = Math.random().toString(36).substr(2, 9);
      setClicks((prev) => [...prev, { ...data, id: clickId }]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== clickId));
      }, 1000);
    });

    return () => {
      socket.off("connect");
      socket.off("updatedUsers");
      socket.off("updatedPos");
      socket.off("userClicked");
    };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="w-full h-screen relative overflow-hidden flex justify-center items-center select-none"
    >
      <div className="gradient-bg" />
      
      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      <AnimatePresence mode="wait">
        {!isJoined ? (
          <JoinScreen onJoin={handleJoin} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full relative"
          >
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center h-full pointer-events-none">
              <h1 className="text-8xl font-outfit font-black text-white/10 select-none">
                SPACE
              </h1>
              <p className="text-slate-500 font-medium tracking-widest mt-4">
                MOVE & CLICK ANYWHERE
              </p>
            </div>

            <UserList users={users} currentId={socket.id} />
            <ClickEffect clicks={clicks} />

            {Object.values(users).map((user) => (
              user.id !== socket.id && (
                <Cursor
                  key={user.id}
                  name={user.name}
                  color={user.color}
                  x={user.x}
                  y={user.y}
                />
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

