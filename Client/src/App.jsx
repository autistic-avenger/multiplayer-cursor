import './App.css'
import { io } from 'socket.io-client'
import { useRef } from 'react';

let socket = io("http://localhost:8080");

socket.on('connect', () => {
  console.log('Connected to Server Socket ID:', socket.id);
});




function App() {
  let x = useRef(undefined);
  let y = useRef(undefined);

  setInterval(()=>{
    socket.emit("positions",{x,y})

  },100)
  socket.on("updatedPos",(users)=>{
    console.log(users);
    })

  function movedMouse(e){
    x.current = e.pageX
    y.current = e.pageY
  }



  return (
    <>
    <div onMouseMove={movedMouse} className='w-full h-screen bg-linear-to-t from-15% from-sky-500 to-indigo-500 flex justify-center items-center'>
      <h1 className='text-9xl font-Stalinist font-light '>Move</h1>
    </div>
    </>
  )
}

export default App
