// @ts-ignore
const mongoose = require("mongoose")
// @ts-ignore
const Schema = mongoose.Schema;

//Data model
const RestaurantSchema = new Schema({
    restaurant_name: String,
    restaurant_description: String,
    restaurant_address: String,
    food_type: String
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);
module.exports = Restaurant;
