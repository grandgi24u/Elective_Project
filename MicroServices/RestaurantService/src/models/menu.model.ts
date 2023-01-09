// @ts-ignore
const mongoose = require("mongoose")
// @ts-ignore
const Schema = mongoose.Schema;

//Data model
const MenuSchema = new Schema({
    menu_name: String,
    menu_description: String,
    menu_price: Number,
    idRestaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant'
    }
});

const Menu = mongoose.model('menu', MenuSchema);
module.exports = Menu;
