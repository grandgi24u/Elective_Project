// @ts-ignore
import Order from '../models/order.model';
// @ts-ignore
import History from "../models/history.model";
// @ts-ignore
const WebSocket = require('ws');
// @ts-ignore
const ws = new WebSocket("ws://localhost:5500");
// @ts-ignore
const wss = new WebSocket.Server({ port: 5500 });

exports.createOrder = (req, res) => {
    const order = new Order({
        order_date : req.body.date,
        order_price : req.body.price,
        order_status : req.body.status,
        userid: req.query.userId,
        deliveryId : "",
        restaurantId : req.body.restaurantId,
    });
    order.save((err) => {
        res.status(200).send(order);
    });
}

exports.deleteOrder = (req, res) => {
    Order.remove({_id: req.params.id}, (err) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).send({message:"Order deleted"});
    });
}

exports.getOrder = (req, res) => {
    Order.findById(req.params.id).then(order => {
        res.status(200).send(order)
    });
}

exports.getOrders = (req, res) => {
    Order.find().then((err, order) => {
        if (err){
            res.status(500).send(err);
        }
        res.status(200).send(order);
    });
}

exports.updateOrderStatus = (req, res) => {
        Order.findByIdAndUpdate(req.params.id, {order_status: req.body.order_status},
            (err, order) => {
                if (req.body.order_status === "5") {
                    History.create({
                        order_price: order.order_price,
                        order_date: order.order_date,
                        userid: order.userid,
                        id_menus: order.id_menus,
                        id_items: order.id_items,
                        restaurantId: order.restaurantId,
                        deliveryId: order.deliveryId,
                    })
                    order.remove({_id: req.params.id});
                    res.status(200).send({message: "Order push to histories"});
                } else if (err) {
                    res.status(404).send({message: err});
                } else {
                    res.status(200).send({message: "Order updated"});
                }
                ws.send(JSON.stringify(order));
            })
}

exports.updateOrderPrice = (req, res) => {
    Order.findByIdAndUpdate(req.params.id, {order_price: req.body.price},
        (err, order) => {
            if (err) {
                res.status(500).send({message: err});
            } else {
                res.status(200).send({message: "Order updated"});
            }
        })
}




