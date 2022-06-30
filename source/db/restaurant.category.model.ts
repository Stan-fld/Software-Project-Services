import mongoose, {ObjectId, Schema} from "mongoose";
import {restauCategories} from "../config/enums";


export interface IRestaurantCategory {
    _id?: ObjectId;
    name: string;
}

const RestaurantCategorySchema: Schema = new Schema({
    name: {
        type: String,
        Enum: restauCategories.list(),
        required: true
    }
})

export default class RestaurantCategory extends mongoose.model<IRestaurantCategory>('RestaurantCategory', RestaurantCategorySchema) {
}


