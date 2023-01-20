"use strict";
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;
// @ts-ignore
const DeliverySchema = new Schema({
    transport_type: String,
    id_order: [String],
    id_order_finished: [String],
    userId: Number,
});
const Delivery = mongoose.model('delivery', DeliverySchema);
module.exports = Delivery;
