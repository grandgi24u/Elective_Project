// @ts-ignore
import Order from "../models/order.model";


exports.createItem = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {$addToSet : {id_items:req.body.itemId}});
    Order.findById(req.params.id).then(order => {
        res.status(200).send(order);
    });
}

exports.createOptionalItem = async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {$addToSet : {id_items_optional:req.body.itemOptionalId}});
    Order.findById(req.params.id).then(order => {
        res.status(200).send(order);
    });
}

// delete an Item
exports.deleteItem = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).send({message: "order not found"});
    }
    for (let itemId in order.id_items) {
        if (order.id_items.includes(req.params.itemId)) {
            await Order.findByIdAndUpdate(order._id, {$pull: {id_items: req.params.itemId}});
            Order.findById(req.params._id).then(order => {
                res.status(200).send({message: "item deleted"});
            });
        }
    }
}

// delete an Optional Item
exports.deleteOptionalItem = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).send({message: "order not found"});
    }
    for (let itemOptionalId in order.id_items_optional) {
        if (order.id_items_optional.includes(req.params.itemOptionalId)) {
            await Order.findByIdAndUpdate(order._id, {$pull: {id_items_optional: req.params.itemOptionalId}});
            Order.findById(req.params._id).then(order => {
                res.status(200).send({message: "item optional deleted"});
            });
        }
    }
}

