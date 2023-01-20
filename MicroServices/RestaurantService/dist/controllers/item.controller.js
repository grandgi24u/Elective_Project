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
const item_model_1 = __importDefault(require("../models/item.model"));
// @ts-ignore
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
// @ts-ignore
const menu_model_1 = __importDefault(require("../models/menu.model"));
//Create an item
exports.createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = new item_model_1.default({
        item_name: req.body.name,
        item_description: req.body.description,
        item_price: req.body.price,
        id_restaurant: req.params.id
    });
    yield item.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(item);
    });
    //If there is an id menu
    if (req.params.idMenu) {
        //If there is required item
        if (req.path.includes('/item_required/')) {
            yield bind_Required_Item_To_Menu(item._id, req.params.idMenu);
        }
        //If there is optional item
        if (req.path.includes('/item_optional/')) {
            yield bind_Optional_Item_To_Menu(item._id, req.params.idMenu);
        }
    }
});
//Delete an item
exports.deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_model_1.default.findById(req.params.id).catch((err) => {
        res.status(500).send({ message: err });
    });
    for (let menu_id in restaurant.id_menus) {
        const menu = yield menu_model_1.default.findById(restaurant.id_menus[menu_id]).catch((err) => {
            res.status(500).send({ message: err });
        });
        if (menu.id_required_items.includes(req.params.idItem)) {
            yield menu_model_1.default.findByIdAndUpdate(menu._id, { $pull: { id_required_items: req.params.idItem } }).catch((err) => {
                res.status(500).send({ message: err });
            });
        }
        if (menu.id_optional_items.includes(req.params.idItem)) {
            yield menu_model_1.default.findByIdAndUpdate(menu._id, { $pull: { id_optional_items: req.params.idItem } }).catch((err) => {
                res.status(500).send({ message: err });
            });
        }
    }
    yield item_model_1.default.remove({ _id: req.params.idItem }, (err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send({ message: "Item deleted" });
    });
});
//Get all the item of a restaurant
exports.getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield item_model_1.default.find({ id_restaurant: req.params.id }, (err, item) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(item);
    });
});
//Get a specific item
exports.getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield item_model_1.default.findById(req.params.idItem, (err, item) => {
        if (err)
            res.status(500).send(err);
        res.status(200).json(item);
    });
});
exports.updateAnItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ItemId = req.params.idItem;
    const updates = req.body;
    yield item_model_1.default.findByIdAndUpdate(ItemId, updates, (err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        else {
            item_model_1.default.findById(ItemId).then((item) => {
                res.status(200).json(item);
            });
        }
    });
});
const bind_Required_Item_To_Menu = (idItem, idMenu) => __awaiter(void 0, void 0, void 0, function* () {
    yield menu_model_1.default.findByIdAndUpdate(idMenu, { $push: { id_required_items: idItem } }).catch((err) => {
        console.log(err);
    });
});
const bind_Optional_Item_To_Menu = (idItem, idMenu) => __awaiter(void 0, void 0, void 0, function* () {
    yield menu_model_1.default.findByIdAndUpdate(idMenu, { $push: { id_optional_items: idItem } }).catch((err) => {
        console.log(err);
    });
});
