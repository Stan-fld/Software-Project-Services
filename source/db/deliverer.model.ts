import mongoose from "mongoose";

const DelivererSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
});

export default class Deliverer extends mongoose.model('Deliverer', DelivererSchema) {
}


