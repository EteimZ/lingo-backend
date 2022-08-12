import { User } from "../models/userModel";
import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";


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


// create user 
const createUser = async (req: Request, res: Response ) => {
    const { username, password, lang } = req.body

    try {
        const user = await User.create({ username, password, lang})
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json({ error: e })
    }   
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
    createUser,
    deleteUser,
    updateUser

}