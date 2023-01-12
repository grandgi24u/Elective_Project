// @ts-ignore
import Item from '../models/item.model';
// @ts-ignore
import Restaurant from "../models/restaurant.model";
// @ts-ignore
import Menu from '../models/menu.model';

// @ts-ignore
import menu from '../controllers/menu.controller';

//Create an item
exports.createItem = (req, res) => {
    const item = new Item();
    item.item_name = req.body.name;
    item.item_description = req.body.description;
    item.item_price = req.body.price;

    item.save((err) => {
        if(err){
            res.send(err);
        }

        res.status(200).send({message: "Item created successfully"});
    });

    bindItem(req.params.id, item._id)

    //If there is an id menu
    if(req.params.idMenu){
        //If there is required item
        if (req.path.includes('/item_required/')) {
            bind_Required_Item_To_Menu(item._id,req.params.idMenu);
        }
        //If there is optional item
        if (req.path.includes('/item_optional/')) {
            bind_Optional_Item_To_Menu(item._id,req.params.idMenu);
        }

    }
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

const bindItem = (idRestaurant, idItem) => {
    Item.findByIdAndUpdate(idItem, {$push : { id_restaurant:idRestaurant}},(err) => {
        return !err;
    });
}

const bind_Required_Item_To_Menu = (idItem, idMenu) => {
    Menu.findByIdAndUpdate(idMenu, {$push : {id_required_items:idItem}},(err) => {
        return !err;
    });
}

const bind_Optional_Item_To_Menu = (idItem, idMenu) => {
    Menu.findByIdAndUpdate(idMenu, {$push : {id_optional_items:idItem}},(err) => {
        return !err;
    });
}





