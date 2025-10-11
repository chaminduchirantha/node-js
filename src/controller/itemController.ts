import { Request, Response } from 'express';
import { Item } from '../models/itemModel';

export const createItem = async (req:Request, res:Response) => {
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const category = req.body.category
    

    if(!name || !price || !description) {
        return res.status(400).json({
            message: 'Name, price and description are required'
        });
    }

    const existingItem = await Item.findOne({name: name});
    if(existingItem) {
        return res.status(409).json({
            message: 'Item with this name already exists'
        });
    }


    const item = new Item({
        name : name, 
        price : price, 
        description: description,
        category: category
    });

    const savedItem = await item.save();
    res.status(201).json({
        message: 'Item created successfully',
        item: savedItem
    })
}