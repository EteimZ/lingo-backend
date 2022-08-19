import { User } from "../models/userModel";
import { Request, Response } from "express";
import { Types } from "mongoose";

import * as jwt from "jsonwebtoken";

const createToken = (_id : Types.ObjectId) => {
    return jwt.sign({_id}, `${process.env.SECRET}`, { expiresIn: '3d' })
}


// signup user 
const signupUser = async (req: Request, res: Response ) => {
    const { username, password, lang } = req.body
    
    try {
        const user = await User.signup(username, password, lang);
        
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (e) {
        res.status(400).json({ error: e })
    }   
}


// login user
const loginUser = async (req: Request, res: Response ) => {

    const { username, password} = req.body;

    try {
        const user = await User.login(username, password)
    
        // create a token
        const token = createToken(user._id)
    
        res.status(200).json({username, token})
      } catch (error) {
        res.status(400).json({error: error})
      }


}



// get all users
const getUsers = async (req: Request, res: Response ) => {
    const users = await User.find()

    res.status(200).json(users)
}


// get one user
const getUser = async (req: Request, res: Response ) => {
    
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Id not valid"})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "No such User"})
    }

    res.status(200).json(user)
}


//  delete user
const deleteUser = async (req: Request, res: Response ) => {
    
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Id not valid"})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(404).json({error: "No such User"})
    }

    res.status(200).json(user)
}


//  update user
const updateUser = async (req: Request, res: Response ) => {
    
    const { id } = req.params

    if (!Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Id not valid"})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({error: "No such User"})
    }

    res.status(200).json(user)
}

export {
    getUser,
    getUsers,
    signupUser,
    deleteUser,
    updateUser,
    loginUser

}