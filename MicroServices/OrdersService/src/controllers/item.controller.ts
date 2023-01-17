// @ts-ignore
import Item from '../models/item.model';
// @ts-ignore
import Order from "../models/order.model";
// @ts-ignore
import Menu from "../models/menu.model";

exports.createItem = (req, res) => {
    const item = new Item({
        item_id: req.body.id,
        item_quantity: req.body.quantity,
        id_order: req.params.id,
    });
    item.save((err) => {
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(item);
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
exports.deleteItem = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        return res.status(404).send({message:"order not found"});
    }
    for (let menu_id in order.id_menus)
    {
        const menu = await Menu.findById(order.id_menus[menu_id]).catch((err) => {
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
        if(order.id_items.includes(req.params.idItem)){
            await Order.findByIdAndUpdate(order._id, {$pull : {id_items:req.params.idItem}}).catch((err) => {
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

//Get a specific item
exports.getItem = async (req, res) => {
    await Item.findById(req.params.idItem, (err, item) => {
        if (err)
            res.status(500).send(err);
        res.status(200).send(item);
    });
}

exports.getItems = (req, res) => {
    Item.find(function(err, users){
        if (err){
            res.status(500).send(err);
        }
        res.status(200).send(users);
    });
}

exports.updateAnItem = (req, res) => {
    Item.findByIdAndUpdate(req.params.idItem, req.body,
        (err) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({message: "Item quantity updated"});
            }
        })
}

const bindItem = (idOrder, idItem) => {
    Order.findByIdAndUpdate(idOrder, {$push : { id_items:idItem}},(err) => {
        return !err;
    });
}

const bind_Required_Item_To_Menu = (idItem, idMenu) => {
    Menu.findByIdAndUpdate(idMenu, {$push : {id_required_items:idItem}},(err) => {
        return !err;
    });
}

const bind_Optional_Item_To_Menu = (idItem, idMenu) => {
    Menu.findByIdAndUpdate(idMenu, {$push: {id_optional_items: idItem}}, (err) => {
        return !err;
    });
}