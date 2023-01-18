// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;


// @ts-ignore
const HistorySchema = new Schema({
    order_date: Date,
    order_price: Number,
    id_menus: [String],
    id_items: [{ type: Schema.Types.ObjectId, ref: 'item' }],
    userid: String,
    deliveryId: String,
    restaurantId: String,
})


// @ts-ignore
const History = mongoose.model('history', HistorySchema);
module.exports = History;