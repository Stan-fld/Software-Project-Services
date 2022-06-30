import mongoose, {ObjectId} from "mongoose";
import {restauStatus} from "../config/enums";
import RestaurantCategory from "./restaurant.category.model";


export interface IRestaurant {
    _id?: ObjectId;
    name: string;
    desc: string;
    address: string;
    phone: string;
    siret: string;
    img: string;
    deliveryCharges: number;
    status: string;
    userId: string;
    restaurantCategoryId?: string;
    restaurantCategory: RestaurantCategory;
}

const RestaurantSchema = new mongoose.Schema({
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
    address: {
        type: String,
        required: true,
        minLength: 5,
    },
    phone: {
        type: String,
        required: true,
        minLength: 4,
        match: [/^\+?[0-9]{10,15}$/, 'Phone must be a valid phone number']
    },
    siret: {
        type: String,
        required: true,
        minLength: 14
    },
    img: {
        type: String,
        required: true
    },
    deliveryCharges: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        Enum: restauStatus.list(),
        default: restauStatus.pending,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    restaurantCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RestaurantCategory',
        required: true,
    }
}, {timestamps: true});

export default class Restaurant extends mongoose.model<IRestaurant>('Restaurant', RestaurantSchema) {
}


