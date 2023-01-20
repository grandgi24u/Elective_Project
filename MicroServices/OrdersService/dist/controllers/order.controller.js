"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const order_model_1 = __importDefault(require("../models/order.model"));
// @ts-ignore
const history_model_1 = __importDefault(require("../models/history.model"));
// @ts-ignore
const WebSocket = require('ws');
// @ts-ignore
const wss = new WebSocket.Server({ port: 5500 });
const ws = new WebSocket('ws://localhost:5500');
wss.on('connection', (ws) => {
    ws.on('message', function incoming(message) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(JSON.parse(message)));
            }
        });
    });
});
exports.createOrder = (req, res) => {
    const order = new order_model_1.default({
        order_date: req.body.date,
        order_price: req.body.price,
        order_status: req.body.status,
        userid: req.query.userId,
        deliveryId: "",
        restaurantId: req.body.restaurantId,
    });
    order.save((err) => {
        res.status(200).send(order);
    });
};
exports.deleteOrder = (req, res) => {
    order_model_1.default.remove({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send({ message: "Order deleted" });
    });
};
exports.getOrder = (req, res) => {
    order_model_1.default.findById(req.params.id).then(order => {
        res.status(200).send(order);
    });
};
exports.getOrders = (req, res) => {
    order_model_1.default.find().then((err, order) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(order);
    });
};
exports.updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.findByIdAndUpdate(req.params.id, { order_status: req.body.order_status }, (err, order) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body.order_status === 5) {
            history_model_1.default.create({
                order_price: order.order_price,
                order_date: order.order_date,
                userid: order.userid,
                id_menus: order.id_menus,
                id_items: order.id_items,
                restaurantId: order.restaurantId,
                deliveryId: order.deliveryId,
            });
            order.remove({ _id: req.params.id });
            res.status(200).send({ message: "Order push to histories" });
        }
        else if (err) {
            res.status(404).send({ message: err });
        }
        else {
            res.status(200).send({ message: "Order updated" });
        }
    })).then((order) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.body.order_status !== 5) {
            yield order_model_1.default.findById(req.params.id).then(order => {
                ws.send(JSON.stringify(order));
            });
        }
    }));
});
exports.updateOrderPrice = (req, res) => {
    order_model_1.default.findByIdAndUpdate(req.params.id, { order_price: req.body.order_price }, (err, order) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            res.status(200).send({ message: "Order updated" });
        }
    });
};
exports.getOrderByRestaurantIdAndByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.find({ restaurantId: req.params.restaurantId, order_status: req.params.order_status }).then((order) => {
        res.status(200).json(order);
    });
});
exports.getOrderByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.find({ order_status: req.params.order_status }).then((order) => {
        res.status(200).json(order);
    });
});
exports.assignDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.findByIdAndUpdate(req.params.id, { deliveryId: req.params.idDelivery }, (err, order) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            res.status(200).send({ message: "Order updated" });
        }
    });
});
exports.getDeliveryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.find({ deliveryId: req.params.idDelivery }).then((order) => {
        res.status(200).json(order);
    });
});
exports.getNumberOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.countDocuments((err, count) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json(`Number of orders: ${count}`);
        }
    });
});
const orderStatus = 2;
exports.getNumberOrderByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    order_model_1.default.countDocuments({ order_status: req.params.order_status }, (err, count) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json(`Number of orders with status ${req.params.order_status}: ${count}`);
        }
    });
});
