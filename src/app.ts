// Load env variables
import dotenv from "dotenv";
dotenv.config();

// Module and Util Imports
import express, { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { join } from "node:path";
import { connectToMongo } from "./connections/mongoConn";

// Router Imports
import { ManagerRouter, ProjectRouter, TaskRouter } from "./routes";

const app = express();
const server = createServer(app);
const port = 4000;

// Setup websocket for events
const io = new Server(server);

// Websocket events
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("join room", (room) => {
    socket.join(room);
  });
});

// Connect to DB
connectToMongo();

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "/public/index.html"));
});
app.use((req: Request, res: Response, next: NextFunction) => {
  req.ws = io;
  next();
});
app.use("/project", ProjectRouter);
app.use("/manager", ManagerRouter);
app.use("/task", TaskRouter);

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
