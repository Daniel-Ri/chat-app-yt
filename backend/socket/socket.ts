import { Server } from "socket.io";
import http from "http";
import express, { Express } from "express";

const app: Express = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

const userSocketMap: Record<string, string> = {}; // {userId, socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  let userId = socket.handshake.query.userId;

  // If userId is an array, take the first element; otherwise, keep it as is
  if (Array.isArray(userId)) {
    userId = userId[0]; // Get the first element if it's an array
  }

  // Make sure userId is a string and not "undefined"
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id; // Use userId as the key
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on() is used to listen to the events. Can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    if (userId && userId !== "undefined") delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
