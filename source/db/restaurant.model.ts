import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
});

export default class Restaurant extends mongoose.model('Restaurant', RestaurantSchema) {
}


