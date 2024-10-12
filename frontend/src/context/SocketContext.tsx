import { createContext, ReactNode, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuthContext } from "./useAuthContext";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. Can be used both on client and server side
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    // ! Do not add "socket", it will make the browser lagging
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
