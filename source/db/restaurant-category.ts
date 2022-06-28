import mongoose, {ObjectId, Schema} from "mongoose";


export interface IRestaurantCategory {
    _id?: ObjectId;
    name: string;
}

const RestaurantCategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
    }
})

export default class RestaurantCategory extends mongoose.model<IRestaurantCategory>('RestaurantCategory', RestaurantCategorySchema) {
}


