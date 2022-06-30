import mongoose, {ObjectId} from "mongoose";
import {orderStatus} from "../config/enums";
import Deliverer from "./deliverer.model";
import Restaurant from "./restaurant.model";
import Item from "./item.model";


export interface IOrder {
    body: mongoose.Types.ObjectId;
    _id?: ObjectId;
    clientId: string;
    deliverer?: Deliverer;
    restaurantId?: string;
    restaurant: Restaurant;
    items: Item[];
    status: number
}

const OrderSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
    },
    deliverer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deliverer',
        required: true,
        default: null
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }],
    status: {
        type: String,
        Enum: orderStatus.list(),
        default: orderStatus.pending,
        required: true,
    }
}, {timestamps: true});

export default class Order extends mongoose.model<IOrder>('Order', OrderSchema) {
}


