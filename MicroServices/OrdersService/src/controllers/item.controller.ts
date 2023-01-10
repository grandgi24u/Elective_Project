// @ts-ignore
import Item from '../models/item.model';
// @ts-ignore
import Order from "../models/order.model";

exports.createItem = (req, res) => {
    const item = new Item();
    item.item_id = req.body.id;
    item.item_quantity = req.body.quantity;
    item.id_order = req.params.id;

    item.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Item created successfully'});
    });
}

exports.deleteItem = (req, res) => {
    Item.remove({_id: req.params.id}, function(err, item){
        if (err){
            res.send(err);
        }
        res.json({message:"Item deleted"});
    });
}

exports.getItem = (req, res) => {
    Item.find(function(err, users) {
        Item.findById(req.params.id, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    })
}

exports.getItems = (req, res) => {
    Item.find(function(err, users){
        if (err){
            res.send(err);
        }
        res.json(users);
    });
}

