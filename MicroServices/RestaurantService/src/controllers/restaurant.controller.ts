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
    console.log(req.body);
    const restaurant = new Restaurant({
        restaurant_name: req.body.name,
        restaurant_description: req.body.description,
        restaurant_address: req.body.address,
        food_type: req.body.food_type,
        userid: req.body.userid,
    });
    await restaurant.save((err) => {
        if(err){
            res.status(404).send({message: err});
        }
        res.status(200).send(restaurant);
    });
}

//Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    const items = await Item.find({id_restaurant : req.params.id});

    for (let menu in restaurant.id_menus){
        await Menu.remove({_id: restaurant.id_menus[menu]});
    }

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

//Get one specific restaurant by user id
exports.getRestaurantById = async (req, res) => {
    await Restaurant.findOne({userid:req.params.idUser}).populate('id_menus').then ((restaurant) => {
        res.status(200).json(restaurant);
    });
}

exports.getRestaurantByType = async (req,res) => {
    await Restaurant.find({food_type:req.params.type}).then((restaurant) => {
        res.status(200).json(restaurant);
    })
}

//Get one specific restaurant
exports.getRestaurant = async (req, res) => {
    await Restaurant.findById(req.params.id).populate('id_menus').then ((restaurant) => {
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






