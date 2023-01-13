// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Item from "../models/item.model";
// @ts-ignore
import Restaurant from "../models/restaurant.model";

//Create a menu
exports.createMenu = (req, res) => {
    const menu = new Menu();
    menu.menu_name = req.body.name;
    menu.menu_description = req.body.description;
    menu.menu_price = req.body.price;

    menu.save((err) => {
        if(err){
            res.send(err);
        }

        res.status(200).send({message: "Menu created successfully"});
    });

    bindMenu(req.params.id, menu._id)


}

//Delete a menu
exports.deleteMenu = async (req, res) => {
    await Restaurant.findByIdAndUpdate(req.params.id, {$pull : {id_menus:req.params.idMenu}});
    Menu.remove({_id: req.params.idMenu}, (err, menu) => {
        if (err){
            res.send(err);
        }
        res.status(200).send({message: "Menu deleted"});
    });
}

//Get all the menu of a restaurant
exports.getMenus = (req, res) => {
    const restaurantID = req.params.id;
    Restaurant.findById(restaurantID, (err, restaurant) => {
        Menu.find({_id: {$in: restaurant.id_menus}}, (err, menus) => {
            if (err)
                res.status(404).send({message: err});
            res.status(200).json(menus);
        });
    });
}

//Get a specific menu with all the items
exports.getMenu = (req, res) => {
    Menu.findById(req.params.idMenu).populate('id_required_items').populate('id_optional_items').then((err, menu) => {
        if (err)
            res.status(404).send({message: err});
        res.json(menu);
    });
}

exports.updateAnMenu = (req, res) => {
    const MenuId = req.params.idMenu;
    const updates = req.body;

    Menu.findByIdAndUpdate(MenuId, updates,
        (err) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({message: "Menu updated"});
            }
        })
}

exports.bindRequiredItem = (req, res) => {
    Menu.findByIdAndUpdate(req.params.idMenu, {$push : {id_required_items:req.params.idItem}},(err, menu) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item add to Menu"});
        }
    });
}

exports.bindOptionalItem = (req, res) => {
    Menu.findByIdAndUpdate(req.params.idMenu, {$push : {id_optional_items:req.params.idItem}},(err, menu) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item add to Menu"});
        }
    });
}

exports.unbindRequiredItem = (req, res) => {
    Menu.findByIdAndUpdate(req.params.idMenu, {$pull : {id_required_items:req.params.idItem}},(err, menu) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item remove from the Menu"});
        }
    });
}

exports.unbindOptionalItem = (req, res) => {
    Menu.findByIdAndUpdate(req.params.idMenu, {$pull : {id_optional_items:req.params.idItem}},(err, menu) => {
        if (err) {
            res.status(404).send({message: err});
        } else {
            res.status(200).send({message: "Item remove from the Menu"});
        }
    });
}

const bindMenu = (idRestaurant, idMenu) => {
    Restaurant.findByIdAndUpdate(idRestaurant, {$push : {id_menus:idMenu}},(err) => {
        return !err;
    });
}






