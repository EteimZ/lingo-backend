import { Schema, model } from "mongoose";

interface IUser {
    username: string;
    password: string;
    lang: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true},
    password: { type: String, required: true},
    lang: { type: String, required: true},
} , { timestamps: true });


const User = model<IUser>('user', userSchema);

export { User };