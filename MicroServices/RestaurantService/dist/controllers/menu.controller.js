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
const menu_model_1 = __importDefault(require("../models/menu.model"));
// @ts-ignore
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
//Create a menu
exports.createMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const menu = new menu_model_1.default({
        menu_name: req.body.name,
        menu_description: req.body.description,
        menu_price: req.body.price,
        menu_type: req.body.type,
        id_required_items: req.body.required_items,
        id_optional_items: req.body.optional_items
    });
    yield menu.save((err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(menu);
    });
    yield bindMenu(req.params.id, menu._id);
});
//Delete a menu
exports.deleteMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurant_model_1.default.findByIdAndUpdate(req.params.id, { $pull: { id_menus: req.params.idMenu } });
    yield menu_model_1.default.remove({ _id: req.params.idMenu }, (err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send({ message: "Menu deleted" });
    });
});
//Get all the menu of a restaurant
exports.getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantID = req.params.id;
    yield restaurant_model_1.default.findById(restaurantID, (err, restaurant) => __awaiter(void 0, void 0, void 0, function* () {
        yield menu_model_1.default.find({ _id: { $in: restaurant.id_menus } }, (err, menus) => {
            if (err)
                res.status(404).send({ message: err });
            res.status(200).json(menus);
        });
    }));
});
//Get a specific menu with all the items
exports.getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menu_model_1.default.findById(req.params.idMenu).populate('id_required_items').populate('id_optional_items').then((menu) => {
        res.status(200).json(menu);
    });
});
exports.updateAnMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    yield menu_model_1.default.findByIdAndUpdate(req.params.idMenu, req.body, (err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        else {
            menu_model_1.default.findById(req.params.idMenu).populate('id_required_items').populate('id_optional_items').then((menu) => {
                res.status(200).json(menu);
            });
        }
    });
});
exports.bindRequiredItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menu_model_1.default.findByIdAndUpdate(req.params.idMenu, { $addToSet: { id_required_items: req.params.idItem } }, (err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        else {
            res.status(200).send({ message: "Item add to Menu" });
        }
    });
});
exports.bindOptionalItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menu_model_1.default.findByIdAndUpdate(req.params.idMenu, { $addToSet: { id_optional_items: req.params.idItem } }, (err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        else {
            res.status(200).send({ message: "Item add to Menu" });
        }
    });
});
exports.unbindRequiredItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menu_model_1.default.findByIdAndUpdate(req.params.idMenu, { $pull: { id_required_items: req.params.idItem } }).then((menu) => {
        res.status(200).send({ menu });
    });
});
exports.unbindOptionalItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield menu_model_1.default.findByIdAndUpdate(req.params.idMenu, { $pull: { id_optional_items: req.params.idItem } }, (err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        else {
            res.status(200).send({ message: "Item remove from the Menu" });
        }
    });
});
const bindMenu = (idRestaurant, idMenu) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurant_model_1.default.findByIdAndUpdate(idRestaurant, { $push: { id_menus: idMenu } }).catch((err) => {
        console.log(err);
    });
});
