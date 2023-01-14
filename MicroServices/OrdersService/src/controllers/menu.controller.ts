// @ts-ignore
import Menu from '../models/menu.model';
// @ts-ignore
import Order from "../models/order.model";
// @ts-ignore
import Item from "../models/item.model";


exports.createMenu = (req, res) => {
    const menu = new Menu();
    menu.menu_name = req.body.name;
    menu.menu_id = req.body.id;
    menu.menu_quantity = req.body.quantity;
    menu.id_order = req.params.id;

    menu.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Menu created successfully'});
    });
    bindMenu(req.params.id, menu._id)
}

//Delete an item
exports.deleteMenu = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).send({message: "order not found"});
    }
    for (let menu_id in order.id_menus) {
        if (order.id_menus.includes(req.params.idMenu)) {
            await Order.findByIdAndUpdate(order._id, {$pull: {id_menus: req.params.idMenu}}).catch((err) => {
                res.status(500).send({message: err});
            });
        }
    }
    await Menu.remove({_id: req.params.idMenu}, (err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send({message: "Menu deleted"});
    });
}

exports.getMenus = (req, res) => {
    const orderID = req.params.id;
    Order.findById(orderID, (err, order) => {
        Menu.find({_id: {$in: order.id_menus}}, (err, menus) => {
            if (err)
                res.status(404).send({message: err});
            res.status(200).json(menus);
        });
    });
}

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

const bindMenu = (idOrder, idMenu) => {
    Order.findByIdAndUpdate(idOrder, {$push : {id_menus:idMenu}},(err) => {
        return !err;
    });
}
