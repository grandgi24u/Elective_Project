// @ts-ignore
const mongoose = require("mongoose");

// @ts-ignore
const Schema = mongoose.Schema;


// @ts-ignore
const OrderSchema = new Schema({
    order_date: Date,
    order_price: Number,
    order_status: Number,
})

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;