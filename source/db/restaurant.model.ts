import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({});

export default class Restaurant extends mongoose.model('Restaurant', RestaurantSchema) {
}


