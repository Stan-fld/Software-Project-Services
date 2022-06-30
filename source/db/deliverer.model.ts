import mongoose from "mongoose";

const DelivererSchema = new mongoose.Schema({});

export default class Deliverer extends mongoose.model('Restaurant', DelivererSchema) {
}


