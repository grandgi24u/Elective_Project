"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
// @ts-ignore
const menu_model_1 = __importDefault(require("../models/menu.model"));
// @ts-ignore
const item_model_1 = __importDefault(require("../models/item.model"));
const checkIfRestaurantExist = (req, res, next) => {
    const RestaurantId = req.params.id;
    restaurant_model_1.default.find({ _id: RestaurantId }, (err, restaurant) => {
        if (!restaurant || restaurant == '') {
            res.status(404).send({ message: "Restaurant not found" });
            return;
        }
        next();
    });
};
const checkIfMenuExist = (req, res, next) => {
    const MenuId = req.params.idMenu;
    menu_model_1.default.find({ _id: MenuId }, (err, menu) => {
        if (!menu || menu == '') {
            res.status(404).send({ message: "Menu not found" });
            return;
        }
        next();
    });
};
const checkIfItemExist = (req, res, next) => {
    const ItemId = req.params.idItem;
    item_model_1.default.find({ _id: ItemId }, (err, item) => {
        if (!item || item == '') {
            res.status(404).send({ message: "Item not found" });
            return;
        }
        next();
    });
};
const checkIfItemBind = (req, res, next) => {
    const ItemId = req.params.idItem;
    const MenuId = req.params.idMenu;
    menu_model_1.default.find({ $or: [{ id_required_items: ItemId }], $and: [{ _id: MenuId }] }, function (err, bind_item) {
        if (!(bind_item === undefined || bind_item.length == 0) && !(req.path.includes('unbind'))) {
            res.status(403).send({ message: "Item already bind to the restaurant" });
            return;
        }
        if ((bind_item === undefined || bind_item.length == 0) && (req.path.includes('unbind'))) {
            res.status(404).send({ message: "Item already unbind from the restaurant" });
            return;
        }
        next();
    });
};
const checkIfItemBindOptionnal = (req, res, next) => {
    const ItemId = req.params.idItem;
    const MenuId = req.params.idMenu;
    menu_model_1.default.find({ $or: [{ id_optional_items: ItemId }], $and: [{ _id: MenuId }] }, function (err, bind_item) {
        if (!(bind_item === undefined || bind_item.length == 0) && !(req.path.includes('unbind'))) {
            res.status(403).send({ message: "Item already bind to the restaurant" });
            return;
        }
        if ((bind_item === undefined || bind_item.length == 0) && (req.path.includes('unbind'))) {
            res.status(404).send({ message: "Item already unbind from the restaurant" });
            return;
        }
        next();
    });
};
const checkOwner = (req, res, next) => {
    const userId = req.query.userId;
    const restaurantId = req.params.id;
    restaurant_model_1.default.findOne({ _id: restaurantId }, (err, restaurant) => {
        if (restaurant) {
            if (restaurant.userid != userId || userId == undefined || userId == '') {
                res.status(403).send({ message: "The user is not the restaurant's owner" });
                return;
            }
        }
        else {
            res.status(404).send({
                message: "Restaurant not found"
            });
            return;
        }
        next();
    });
};
const checkRole = (req, res, next) => {
    const roleId = req.query.roleId;
    const restaurantId = req.params.id;
    if (roleId != 2) {
        res.status(403).send({ message: "Permission denied" });
        return;
    }
    next();
};
// @ts-ignore
const checkData = {
    checkIfRestaurantExist: checkIfRestaurantExist,
    checkIfMenuExist: checkIfMenuExist,
    checkIfItemExist: checkIfItemExist,
    checkIfItemBind: checkIfItemBind,
    checkIfItemBindOptionnal: checkIfItemBindOptionnal,
    checkOwner: checkOwner,
    checkRole: checkRole
};
module.exports = checkData;
