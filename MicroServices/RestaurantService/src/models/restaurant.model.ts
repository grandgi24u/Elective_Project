// @ts-ignore
const mongoose = require("mongoose")
// @ts-ignore
const Schema = mongoose.Schema;

//Data model
const RestaurantSchema = new Schema({
    restaurant_name: String,
    restaurant_description: String,
    restaurant_address: String,
    food_type: String,
    id_menus: [{ type: Schema.Types.ObjectId, ref: 'menu' }]
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);
module.exports = Restaurant;
