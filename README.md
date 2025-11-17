# 🖱️ Multiplayer Cursor

A simple realtime mouse-sharing demo built with **React** and **Socket.io**.  
Each connected user can see the cursor positions of every other user, with smooth, synchronized movement across all clients.

## 1. Features

1. **Realtime cursor broadcasting** with Socket.io  
2. **Smooth transitions** for remote cursor movement  
3. **React client** that sends and receives coordinate updates  
4. **Lightweight server** for tracking and broadcasting user positions  
5. **Tailwind CSS** styling for simple UI

## 2. Demo Video


https://github.com/user-attachments/assets/13d58816-101e-4254-aafe-6f3d57e9d088



## 3. How It Works

1. The client connects to the Socket.io server at:  
   **http://localhost:8080**
2. The client emits its current mouse coordinates every **100 ms**
3. The server stores the positions of all connected users
4. The server broadcasts the updated positions to every client
5. Each client renders a pointer for every user **except itself**

## 4. Tech Stack

- **React**  
- **Socket.io (client + server)**  
- **Tailwind CSS**  
- **Node.js** (for backend server)


## 5. Running Instructions
1. 🌀 Clone the project using Git  
   ```bash
   git clone https://github.com/autistic-avenger/multiplayer-cursor
   cd multiplayer-cursor
   ```

2. 📂 To run the Frontend:   
   ```bash
   cd Client
   npm run dev
   ```
3.  📂 To run the Backend:   
    ```bash
    cd Server
    npm run server
    ```
