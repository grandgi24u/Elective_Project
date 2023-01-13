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

    bindItem(req.params.id, item._id)

    item.save((err) => {
        if(err){
            res.send(err);
        }
        res.status(200).send({message: "Item created successfully"});
    });

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
    const restaurant = Restaurant.findById(req.params.id)
    for (let menu_id in restaurant.id_menus)
    {
        const menu = Menu.findById(restaurant.id_menus[menu_id]);
        if(menu.id_required_items.includes(req.params.idItem)){
            Menu.findByIdAndUpdate(menu._id, {$pull : {id_required_items:req.params.idItem}});
        }
        if(menu.id_optional_items.includes(req.params.idItem)){
            Menu.findByIdAndUpdate(menu._id, {$pull : {id_optional_items:req.params.idItem}});
        }
    }
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
    console.log(idRestaurant);
    console.log(idItem);
    Item.findByIdAndUpdate(idItem,{id_restaurant:idRestaurant}).exec();
}

const bind_Required_Item_To_Menu = (idItem, idMenu) => {
    Menu.findByIdAndUpdate(idMenu, {$push : {id_required_items:idItem}}).exec();
}

const bind_Optional_Item_To_Menu = (idItem, idMenu) => {
    Menu.findByIdAndUpdate(idMenu, {$push : {id_optional_items:idItem}}).exec();
}





