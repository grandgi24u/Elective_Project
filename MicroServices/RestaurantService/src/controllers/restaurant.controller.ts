// @ts-ignore
import Restaurant from '../models/restaurant.model';
// @ts-ignore
import Menu from "../models/menu.model";
// @ts-ignore
import Item from "../models/item.model";
// @ts-ignore
import ItemController from "./item.controller";

//Create a restaurant
exports.createRestaurant = async (req, res) => {
    const restaurant = new Restaurant({
        restaurant_name: req.body.name,
        restaurant_description: req.body.description,
        restaurant_address: req.body.address,
        food_type: req.body.food_type,
        userid: req.query.user_id,
    });
    await restaurant.save((err) => {
        if(err){
            res.status(404).send({message: err});
        }
        res.status(200).send({message: "Restaurant created successfully"});
    });
}

//Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    for (let menu in restaurant.id_menus){
        await Menu.remove({_id: restaurant.id_menus[menu]});
    }
    const items = await Item.find({id_restaurant : req.paramsid});
    for (let item in items)
    {
        await Item.remove({_id:items[item]._id});
    }
    await Restaurant.remove({_id: req.params.id}, (err) =>{
        if (err){
            res.status(404).send({message: err});
        }
        res.status(200).send({message: "Restaurant deleted (with menus and items)"});
    });
}

//Get all the restaurants
exports.getRestaurants = async (req, res) => {
    await Restaurant.find((err, restaurants) => {
        if (err){
            res.status(404).send({message: err});
        }
        res.status(200).json(restaurants);
    });
}

//Get one specific restaurant
exports.getRestaurant = async (req, res) => {
    await Restaurant.findById(req.params.id).populate('id_menus').then ((err, restaurant) => {
        if (err) {
            res.status(404).send({message: err});
        }
        res.status(200).json(restaurant);
    });
}

exports.updateAnRestaurant = async (req, res) => {
    await Restaurant.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Restaurant updated"});
        }
    });
}






