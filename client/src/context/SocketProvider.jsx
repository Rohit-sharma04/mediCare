// SocketProvider.jsx
import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // http://localhost:8080
    // https://my-medicare-backend.onrender.com
    const newSocket = io("https://my-medicare-backend.onrender.com", {
      withCredentials: true,
      reconnection: true,
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
