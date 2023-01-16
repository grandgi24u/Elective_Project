// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Item from "../models/item.model";
// @ts-ignore
import Restaurant from "../models/restaurant.model";

//Create a menu
exports.createMenu = async (req, res) => {
    const menu = new Menu({
        menu_name: req.body.name,
        menu_description: req.body.description,
        menu_price: req.body.price,
        menu_type: req.body.type,

    });
    await menu.save((err) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send({message: "Menu created successfully"});
    });
    await bindMenu(req.params.id, menu._id);
}

//Delete a menu
exports.deleteMenu = async (req, res) => {
    await Restaurant.findByIdAndUpdate(req.params.id, {$pull : {id_menus:req.params.idMenu}});
    await Menu.remove({_id: req.params.idMenu}, (err) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).send({message: "Menu deleted"});
    });
}

//Get all the menu of a restaurant
exports.getMenus = async (req, res) => {
    const restaurantID = req.params.id;
    await Restaurant.findById(restaurantID, async (err, restaurant) => {
        await Menu.find({_id: {$in: restaurant.id_menus}}, (err, menus) => {
            if (err)
                res.status(404).send({message: err});
            res.status(200).json(menus);
        });
    });
}

//Get a specific menu with all the items
exports.getMenu = async (req, res) => {
    await Menu.findById(req.params.idMenu).populate('id_required_items').populate('id_optional_items').then((menu) => {
        res.status(200).json(menu);
    });
}

exports.updateAnMenu = async (req, res) => {
    await Menu.findByIdAndUpdate(req.params.idMenu, req.body,
        (err) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({message: "Menu updated"});
            }
        });
}

exports.bindRequiredItem = async (req, res) => {
    await Menu.findByIdAndUpdate(req.params.idMenu, {$push : {id_required_items:req.params.idItem}},(err) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item add to Menu"});
        }
    });
}

exports.bindOptionalItem = async (req, res) => {
    await Menu.findByIdAndUpdate(req.params.idMenu, {$push : {id_optional_items:req.params.idItem}},(err) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item add to Menu"});
        }
    });
}

exports.unbindRequiredItem = async (req, res) => {
    await Menu.findByIdAndUpdate(req.params.idMenu, {$pull : {id_required_items:req.params.idItem}},(err) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item remove from the Menu"});
        }
    });
}

exports.unbindOptionalItem = async (req, res) => {
    await Menu.findByIdAndUpdate(req.params.idMenu, {$pull : {id_optional_items:req.params.idItem}},(err) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item remove from the Menu"});
        }
    });
}

const bindMenu = async (idRestaurant, idMenu) => {
    await Restaurant.findByIdAndUpdate(idRestaurant, {$push : {id_menus:idMenu}}).catch((err) => {
        console.log(err);
    });
}






