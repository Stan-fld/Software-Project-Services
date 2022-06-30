import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({});

export default class Item extends mongoose.model('Item', ItemSchema) {
}


