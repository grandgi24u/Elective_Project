// @ts-ignore
const mongoose = require("mongoose")
// @ts-ignore
const Schema = mongoose.Schema;

//Data model
const MenuSchema = new Schema({
    menu_name: String,
    menu_description: String,
    menu_price: Number,
    menu_type: String,
    id_required_items: [{ type: Schema.Types.ObjectId, ref: 'item' }],
    id_optional_items: [{ type: Schema.Types.ObjectId, ref: 'item' }]
});

const Menu = mongoose.model('menu', MenuSchema);
module.exports = Menu;
