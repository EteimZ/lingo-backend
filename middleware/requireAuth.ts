import * as jwt from "jsonwebtoken";
import {  User } from "../models/userModel";

import { Response, NextFunction } from "express";


const requireAuth = async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization ){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } :any = jwt.verify(token, `${process.env.SECRET}`)

        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }
}

export default requireAuth;

