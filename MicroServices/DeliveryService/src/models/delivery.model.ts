// @ts-ignore
const mongoose = require("mongoose");

// @ts-ignore
const Schema = mongoose.Schema;

// @ts-ignore
const DeliverySchema = new Schema({
    id_delivery: Number,
    transport_type: String,
    id_order: {type: Schema.Types.ObjectId, ref:'Order'}
})

const Delivery = mongoose.model('delivery', DeliverySchema);
module.exports = Delivery;