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
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
// @ts-ignore
const menu_model_1 = __importDefault(require("../models/menu.model"));
// @ts-ignore
const item_model_1 = __importDefault(require("../models/item.model"));
//Create a restaurant
exports.createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const restaurant = new restaurant_model_1.default({
        restaurant_name: req.body.name,
        restaurant_description: req.body.description,
        restaurant_address: req.body.address,
        food_type: req.body.food_type,
        userid: req.body.userid,
    });
    yield restaurant.save((err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        res.status(200).send(restaurant);
    });
});
//Delete a restaurant
exports.deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield restaurant_model_1.default.findById(req.params.id);
    const items = yield item_model_1.default.find({ id_restaurant: req.params.id });
    for (let menu in restaurant.id_menus) {
        yield menu_model_1.default.remove({ _id: restaurant.id_menus[menu] });
    }
    for (let item in items) {
        yield item_model_1.default.remove({ _id: items[item]._id });
    }
    yield restaurant_model_1.default.remove({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        res.status(200).send({ message: "Restaurant deleted (with menus and items)" });
    });
});
//Get all the restaurants
exports.getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurant_model_1.default.find((err, restaurants) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        res.status(200).json(restaurants);
    });
});
//Get one specific restaurant by user id
exports.getRestaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurant_model_1.default.findOne({ userid: req.params.idUser }).populate('id_menus').then((restaurant) => {
        res.status(200).json(restaurant);
    });
});
exports.getRestaurantByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurant_model_1.default.find({ food_type: req.params.type }).then((restaurant) => {
        res.status(200).json(restaurant);
    });
});
//Get one specific restaurant
exports.getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurant_model_1.default.findById(req.params.id).populate('id_menus').then((restaurant) => {
        res.status(200).json(restaurant);
    });
});
exports.updateAnRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield restaurant_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.status(404).send({ message: err });
        }
        else {
            res.status(200).send({ message: "Restaurant updated" });
        }
    });
});
