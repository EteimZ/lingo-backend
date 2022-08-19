import { Schema, Model, model, Types } from "mongoose";
import * as bcrypt from 'bcrypt'; 


// TODO: Seperate interfaces from schema
interface IUser {
    _id: Types.ObjectId;
    username: string;
    password: string;
    lang: string;
    friends?: [string];
}


interface UserModel extends Model<IUser> {
    signup(username:string, password:string, lang:string): Promise<IUser>;
    login(username:string, password:string): Promise<IUser>; 
  }

const userSchema = new Schema<IUser, UserModel>({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    lang: { type: String, required: true},
    friends: { type: [String], required: false},
} , { timestamps: true });


userSchema.statics.signup = async function (username:string, password:string, lang:string): Promise<IUser>{

    const exists = await this.findOne({username})

    if (exists) {
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash, lang})

    return user
}


userSchema.statics.login = async function (username:string, password:string): Promise<IUser>{
    
    const user = await this.findOne({ username });

    if (!user) {
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password);

    if ( !match ){
        throw Error("Incorrect password")
    }

    return user
}



const User = model<IUser, UserModel>('user', userSchema);

export { User };