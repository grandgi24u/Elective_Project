// @ts-ignore
const mongoose = require("mongoose");

// @ts-ignore
const Schema = mongoose.Schema;

// @ts-ignore
const ItemSchema = new Schema({
    item_id : Number,
    item_quantity: Number,
    id_order: {type: Schema.Types.ObjectId, ref:'Order'}
})

const Item = mongoose.model('item', ItemSchema);
module.exports = Item;