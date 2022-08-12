import express, {Application, Request, Response} from 'express';
import userRouter  from "./routes/userRoute";
import { connect } from 'mongoose';

const app: Application = express()
const port = 3000

app.use(express.json())

app.use('/api/users', userRouter);

app.get("/", (req: Request, res: Response) => {
    res.json({"msg": "Lingo up"})
})

async function run(){
    await connect("mongodb://lingo_user:lingo_pwd@mongo/lingo_db")
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
