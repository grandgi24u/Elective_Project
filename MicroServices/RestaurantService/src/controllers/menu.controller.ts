// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Restaurant from "../models/restaurant.model";

//Create a menu
exports.createMenu = (req, res) => {
    const menu = new Menu();
    menu.menu_name = req.body.name;
    menu.menu_description = req.body.description;
    menu.menu_price = req.body.price;
    menu.id_restaurant = req.params.id;

    menu.save((err) => {
        if(err){
            res.send(err);
        }

        res.status(200).send({message: "Menu created successfully"});
    });
}

//Delete a menu
exports.deleteMenu = (req, res) => {
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

    Menu.find({id_restaurant:restaurantID}, (err, menus) => {
        if (err){
            res.send(err);
        }
            res.json(menus);
    });
}

//Get a specific menu
exports.getMenu = (req, res) => {
    const restaurantID = req.params.id;

    Menu.find((err, users) => {
        Menu.findById(req.params.idMenu, (err, users) => {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
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





