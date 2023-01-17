// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;

// @ts-ignore
const MenuSchema = new Schema({
    menu_id : String,
    id_order: {type: Schema.Types.ObjectId, ref:'Order'},
})

const Menu = mongoose.model('menu', MenuSchema);
module.exports = Menu;

