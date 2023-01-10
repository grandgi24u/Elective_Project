// @ts-ignore
import Menu from '../models/menu.model';

//Create a menu
exports.createMenu = (req, res) => {
    const menu = new Menu();
    menu.menu_name = req.body.name;
    menu.menu_description = req.body.description;
    menu.menu_price = req.body.price;
    menu.id_restaurant = req.params.id;

    menu.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Menu created successfully'});
    });
}

//Delete a menu
exports.deleteMenu = (req, res) => {
    Menu.remove({_id: req.params.idMenu}, function(err, menu){
        if (err){
            res.send(err);
        }
        res.json({message:"Menu deleted"});
    });
}

//Get all the menu of a restaurant
exports.getMenus = (req, res) => {
    const restaurantID = req.params.id;

    Menu.find({id_restaurant:restaurantID}, function(err, menus){
        if (err){
            res.send(err);
        }
            res.json(menus);
    });
}

//Get a specific menu
exports.getMenu = (req, res) => {
    Menu.find(function(err, users) {
        Menu.findById(req.params.idMenu, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
}





