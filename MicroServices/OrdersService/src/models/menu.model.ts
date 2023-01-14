// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;

// @ts-ignore
const MenuSchema = new Schema({
    menu_name: String,
    menu_id : Number,
    menu_quantity: Number,
    id_order: {type: Schema.Types.ObjectId, ref:'Order'},
    id_required_items: [{ type: Schema.Types.ObjectId, ref: 'item' }],
    id_optional_items: [{ type: Schema.Types.ObjectId, ref: 'item' }]
})

const Menu = mongoose.model('menu', MenuSchema);
module.exports = Menu;

