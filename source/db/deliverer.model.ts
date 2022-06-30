import mongoose, {ObjectId} from "mongoose";
import {delivererStatus} from "../config/enums";


export interface IDeliverer {
    _id?: ObjectId;
    userId: string;
    status: string;
}

const DelivererSchema = new mongoose.Schema({
    status: {
        type: String,
        Enum: delivererStatus.list(),
        default: delivererStatus.pending,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    }
}, {timestamps: true});

export default class Deliverer extends mongoose.model<IDeliverer>('Deliverer', DelivererSchema) {
}


