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
exports.createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.default.findByIdAndUpdate(req.params.id, { $addToSet: { id_menus: req.body.menu_id } });
    order_model_1.default.findById(req.params.id).then(order => {
        res.status(200).send(order);
    });
});
//Delete an item
exports.deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(req.params.id);
    if (!order) {
        return res.status(404).send({ message: "order not found" });
    }
    if (order.id_menus.includes(req.params.idMenu)) {
        yield order_model_1.default.findByIdAndUpdate(order._id, { $pull: { id_menus: req.params.idMenu } });
        return res.status(200).send("menu delete");
    }
});
