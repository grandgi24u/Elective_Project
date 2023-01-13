// @ts-ignore
import Item from '../models/item.model';
// @ts-ignore
import Restaurant from "../models/restaurant.model";
// @ts-ignore
import Menu from '../models/menu.model';

// @ts-ignore
import menu from '../controllers/menu.controller';

//Create an item
exports.createItem = async (req, res) => {
    const item = new Item({
        item_name : req.body.name,
        item_description : req.body.description,
        item_price : req.body.price,
        id_restaurant : req.params.id
    });
    await item.save((err) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send({message: "Item created successfully"});
    });
    //If there is an id menu
    if(req.params.idMenu){
        //If there is required item
        if (req.path.includes('/item_required/')) {
            await bind_Required_Item_To_Menu(item._id,req.params.idMenu);
        }
        //If there is optional item
        if (req.path.includes('/item_optional/')) {
            await bind_Optional_Item_To_Menu(item._id,req.params.idMenu);
        }
    }
}

//Delete an item
exports.deleteItem = async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id).catch((err) => {
        res.status(500).send({message: err});
    });
    for (let menu_id in restaurant.id_menus)
    {
        const menu = await Menu.findById(restaurant.id_menus[menu_id]).catch((err) => {
            res.status(500).send({message: err});
        });
        if(menu.id_required_items.includes(req.params.idItem)){
            await Menu.findByIdAndUpdate(menu._id, {$pull : {id_required_items:req.params.idItem}}).catch((err) => {
                res.status(500).send({message: err});
            });
        }
        if(menu.id_optional_items.includes(req.params.idItem)){
            await Menu.findByIdAndUpdate(menu._id, {$pull : {id_optional_items:req.params.idItem}}).catch((err) => {
                res.status(500).send({message: err});
            });
        }
    }
    await Item.remove({_id: req.params.idItem}, (err) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).send({message: "Item deleted"});
    });
}

//Get all the item of a restaurant
exports.getItems = async (req, res) => {
    await Item.find({id_restaurant: req.params.id}, (err, item) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).json(item);
    });
}

//Get a specific item
exports.getItem = async (req, res) => {
    await Item.findById(req.params.idItem, (err, item) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json(item);
    });
}

exports.updateAnItem = async (req, res) => {
    const ItemId = req.params.idItem;
    const updates = req.body;
    await Item.findByIdAndUpdate(ItemId, updates,
        (err) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({message: "Item updated"});
            }
        })
}

const bind_Required_Item_To_Menu = async (idItem, idMenu) => {
    await Menu.findByIdAndUpdate(idMenu, {$push : {id_required_items:idItem}}).catch((err) => {
        console.log(err);
    });
}

const bind_Optional_Item_To_Menu = async (idItem, idMenu) => {
    await Menu.findByIdAndUpdate(idMenu, {$push : {id_optional_items:idItem}}).catch((err) => {
        console.log(err);
    });
}





