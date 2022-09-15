import express, {Application, Request, Response} from 'express';
import { Server } from "socket.io";
import { createServer } from 'http';

import userRouter  from "./routes/userRoute";
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

const port = process.env.PORT


app.use(express.json())
app.use(cors())


app.use('/api/users', userRouter);

app.get("/", (req: Request, res: Response) => {
    res.json({"msg": "Lingo up"})
})


io.on("connection", (socket) => {
    console.log("Socket connected.")
})


async function run(){
    await connect(`${process.env.MONGO_URI}`)
    console.log("Connected to database")

    httpServer.listen(port, () => {
        console.log(`Server running on port ${port} `)
    })
}

try {
    run()
} catch (e) {
    console.log(e)
}
