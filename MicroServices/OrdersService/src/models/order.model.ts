// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;
// @ts-ignore
const today = new Date();


// @ts-ignore
const OrderSchema = new Schema({
    order_date: Date,
    order_price: String,
    order_status: String,
    id_menus: [{ type: Schema.Types.ObjectId, ref: 'menu' }],
    id_items: [{ type: Schema.Types.ObjectId, ref: 'item' }],
    userid: Number
})

OrderSchema.path('order_date').validate(function (value) {
    return value >= today;
}, 'Invalid date: date must be in the future');

const Order = mongoose.model('order', OrderSchema);
module.exports = Order;