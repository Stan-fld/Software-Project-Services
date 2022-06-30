import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
});

export default class Item extends mongoose.model('Item', ItemSchema) {
}


