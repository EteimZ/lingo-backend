import express, { Application, Request, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";

import userRouter from "./routes/userRoute";
import { connect } from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Lingo up" });
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Username not provided"));
  }
  socket.data.username = username;
  next();
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.data.username,
    });
  }
  socket.emit("users", users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.data.username,
  });

  socket.on("private message", ({ content, to}) => {
    socket.to(to).emit("private message", {
        content,
        from : socket.id,
    });
  });

  socket.on("disconnect", () => {
      socket.broadcast.emit("user disconnected", socket.id);
  });

});

io.on("connection", (socket) => {
  console.log("Socket connected.");
});

async function run() {
  await connect(`${process.env.MONGO_URI}`);
  console.log("Connected to database");

  httpServer.listen(port, () => {
    console.log(`Server running on port ${port} `);
  });
}

try {
  run();
} catch (e) {
  console.log(e);
}
