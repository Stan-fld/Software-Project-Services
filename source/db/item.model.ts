import mongoose, {ObjectId} from "mongoose";
import Restaurant from "./restaurant.model";


export interface IItem {
    _id?: ObjectId;
    name: string;
    desc: string;
    price: number;
    img: string;
    restaurant: Restaurant;
}

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    },
    desc: {
        type: String,
        required: true,
        minLength: 5,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    }
}, {timestamps: true});

export default class Item extends mongoose.model<IItem>('Item', ItemSchema) {
}


