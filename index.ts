import express, {Application, Request, Response} from 'express';
import userRouter  from "./routes/userRoute";
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import * as cors from 'cors';


dotenv.config();


const app: Application = express()
const port = process.env.PORT



app.use(express.json())
app.use(cors())


app.use('/api/users', userRouter);

app.get("/", (req: Request, res: Response) => {
    res.json({"msg": "Lingo up"})
})

async function run(){

    await connect(`${process.env.MONGO_URI}`)
    console.log("Connected to database")
    app.listen(port, () => {
        console.log(`Server running on port ${port} `)
    })
}

try {
    run()
} catch (e) {
    console.log(e)
}
