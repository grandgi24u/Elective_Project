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
const checkIfUserIdExist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const delivery = yield delivery_model_1.default.find({ userId: req.body.userId });
    if (delivery.length > 0) {
        return res.status(409).send({ message: 'User already exist' });
    }
    next();
});
// @ts-ignore
const checkData = {
    checkIfUserIdExist: checkIfUserIdExist
};
module.exports = checkData;
