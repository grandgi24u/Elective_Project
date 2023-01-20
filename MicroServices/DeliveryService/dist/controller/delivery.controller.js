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
const delivery_model_1 = __importDefault(require("../models/delivery.model"));
exports.createDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const delivery = new delivery_model_1.default({
        transport_type: req.body.transport_type,
        userId: req.body.userId
    });
    yield delivery.save((err, delivery) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(delivery);
    });
});
exports.deleteDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delivery_model_1.default.remove({ _id: req.params.id }, (err, delivery) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json({ message: "Delivery deleted" });
    });
});
exports.getDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delivery_model_1.default.findById(req.params.id, (err, delivery) => {
        if (err)
            res.status(404).send(err);
        res.status(200).json(delivery);
    });
});
exports.getDeliveryByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delivery_model_1.default.find({ userId: req.params.id }, (err, delivery) => {
        if (err)
            res.status(404).send(err);
        res.status(200).json(delivery);
    });
});
exports.getDeliveries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delivery_model_1.default.find((err, delivery) => {
        if (err)
            res.status(404).send(err);
        res.status(200).json(delivery);
    });
});
exports.updateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield delivery_model_1.default.findOneAndUpdate({ _id: req.params.id }, {
        transport_type: req.body.transport_type
    }, (err, delivery) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json(delivery);
    });
});
exports.addOrder = (req, res) => {
    delivery_model_1.default.findByIdAndUpdate(req.params.id, { $push: { id_order: req.body.orderId } }, (err, delivery) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json({ message: "Order added" });
    });
};
exports.deleteOrder = (req, res) => {
    delivery_model_1.default.findByIdAndUpdate(req.params.id, { $pull: { id_order: req.body.orderId } }, (err, delivery) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json({ message: "Order deleted" });
    });
};
exports.addOrderFinished = (req, res) => {
    delivery_model_1.default.findByIdAndUpdate(req.params.id, { $push: { id_order_finished: req.body.orderId } }, (err, delivery) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json({ message: "Order added" });
    });
};
exports.deleteOrderFinished = (req, res) => {
    delivery_model_1.default.findByIdAndUpdate(req.params.id, { $pull: { id_order_finished: req.body.orderId } }, (err, delivery) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json({ message: "Order deleted" });
    });
};
