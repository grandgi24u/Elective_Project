// @ts-ignore
import Order from '../models/order.model';
// @ts-ignore
import Menu from "../models/menu.model";
// @ts-ignore
import menu from "./menu.controller";

exports.createOrder = (req, res) => {
    const order = new Order();
    order.order_date = req.body.date;
    order.order_price = req.body.price;
    order.order_status = req.body.status;

    order.save(function(err){
        if(err){
            res.send(err);
        }
        res.json({message : 'Order created successfully'});
    });
}

exports.deleteOrder = (req, res) => {
    Order.remove({_id: req.params.id}, function(err, order){
        if (err){
            res.send(err);
        }
        res.json({message:"Order deleted"});
    });
}

exports.getOrder = (req, res) => {
    Order.find((err, users) => {
        Order.findById(req.params.id).populate('id_menus').populate('id_items').then ((err, order) => {
            if (err) {
                res.status(404).send({message: err});
            }
            res.json(order)
        });
    })
}

exports.getOrders = (req, res) => {
    Order.find(function(err, order){
        if (err){
            res.send(err);
        }
        res.json(order);
    });
}

exports.updateOrderStatus = (req, res) => {
    const orderId = req.params.id;
    const updates = req.body;

    Order.findByIdAndUpdate(orderId, updates,
        (err, order) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({message: "Order updated"});
            }
        })
}

exports.updateOrderPrice = (req, res) => {
    const orderId = req.params.id;
    const updates = req.body;

    Order.findByIdAndUpdate(orderId, updates,
        (err, order) => {
            if (err) {
                res.status(404).send({message: err});
            } else {
                res.status(200).send({message: "Order updated"});
            }
        })
}



