import {Request , Response} from 'express';
import { User } from '../models/userModels';

export const createUser = async(req:Request, res:Response) => {
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;

    if(!name || !email) {
        return res.status(400).json({
            message: 'Name and email are required'
        });
    }

    const existingUser = await User.findOne({email: email});
    if(existingUser) {
        return res.status(409).json({
            message: 'User with this email already exists'
        });
    }

    const user = new User({
        name : name, 
        email : email, 
        age: age
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