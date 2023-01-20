"use strict";
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;
//Data model
const ItemSchema = new Schema({
    item_name: String,
    item_description: String,
    item_price: Number,
    id_restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
});
const Item = mongoose.model('item', ItemSchema);
module.exports = Item;
