// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Order from "../models/order.model";


exports.createMenu = (req, res) => {
    const menu = new Menu();
    menu.menu_id = req.body.id;
    menu.menu_quantity = req.body.quantity;
    menu.id_order = req.params.id;

    menu.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Menu created successfully'});
    });
}

exports.deleteMenu = (req, res) => {
    Menu.remove({_id: req.params.id}, function(err, item){
        if (err){
            res.send(err);
        }
        res.json({message:"Menu deleted"});
    });
}

exports.getMenu = (req, res) => {
    Menu.find(function(err, users) {
        Menu.findById(req.params.id, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
}

exports.getMenus = (req, res) => {
    Menu.find(function(err, users){
        if (err){
            res.send(err);
        }
        res.json(users);
    });
}

