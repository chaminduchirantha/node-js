import {Request , Response} from 'express';
import { User } from '../models/userModels';

export const createUser = async(req:Request, res:Response) => {
    const {name, email , age} = req.body;

    const user = new User({
        name, 
        email, 
        age
    });

    const savedUser = await user.save();
    res.status(201).json({
        message: 'User created successfully',
        user: savedUser
    })
}

const getUsers = async (req:Request, res:Response) => {
   res.send("user List")
}