// @ts-ignore
import Item from '../models/item.model';
// @ts-ignore
import Restaurant from "../models/restaurant.model";

//Create an item
exports.createItem = (req, res) => {
    const item = new Item();
    item.item_name = req.body.name;
    item.item_description = req.body.description;
    item.item_price = req.body.price;
    item.id_restaurant = req.params.id;

    item.save((err) => {
        if(err){
            res.send(err);
        }

        res.status(200).send({message: "Item created successfully"});
    });
}

//Delete an item
exports.deleteItem = (req, res) => {
    Item.remove({_id: req.params.idItem}, (err) => {
        if (err){
            res.send(err);
        }
        res.status(200).send({message: "Item deleted"});
    });
}

//Get all the item of a restaurant
exports.getItems = (req, res) => {
    const restaurantID = req.params.id;

    Item.find({id_restaurant:restaurantID}, (err, item) => {
        if (err){
            res.send(err);
        }
        res.json(item);
    });
}

//Get a specific item
exports.getItem = (req, res) => {
    const restaurantID = req.params.id;

    Item.find((err, users) => {
        Item.findById(req.params.idItem, (err, item) => {
            if (err)
                res.send(err);
            res.json(item);
        });
    })
}

exports.updateAnItem = (req, res) => {
    const ItemId = req.params.idItem;
    const updates = req.body;

    Item.findByIdAndUpdate(ItemId, updates,
        (err) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({message: "Item updated"});
            }
        })
}





