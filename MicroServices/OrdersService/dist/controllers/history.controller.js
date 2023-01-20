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
const history_model_1 = __importDefault(require("../models/history.model"));
exports.getHistoriesOrders = (req, res) => {
    history_model_1.default.find(function (err, history) {
        if (err) {
            res.send(err);
        }
        res.json(history);
    });
};
exports.get100LastHistoriesOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield history_model_1.default.find().sort({ order_date: -1 }).limit(100).then((history) => {
        res.status(200).json(history);
    });
});
exports.getHistoryOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    history_model_1.default.findById(req.params.idHistory).then((history) => {
        res.status(200).json(history);
    });
});
//Get one specific restaurant by user id
exports.getHistoryOrderByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield history_model_1.default.find({ userid: req.params.idUser }).then((history) => {
        res.status(200).json(history);
    });
});
exports.getHistoryOrderByRestaurantId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield history_model_1.default.find({ restaurantId: req.params.restaurantId }).then((history) => {
        res.status(200).json(history);
    });
});
exports.getHistoryOrderByDeliveryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield history_model_1.default.find({ deliveryId: req.params.deliveryId }).then((history) => {
        res.status(200).json(history);
    });
});
exports.getHistoryOrderByRestaurantIdAndByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield history_model_1.default.find({ order_status: req.params.order_status }).then((history) => {
        res.status(200).json(history);
    });
});
let total_price = 0;
exports.getTotalMoneyOfOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    history_model_1.default.find({}, (err, history) => {
        if (err) {
            console.log(err);
        }
        else {
            history.every(history => {
                total_price += history.order_price;
                res.status(200).json(total_price);
            });
        }
    });
});
