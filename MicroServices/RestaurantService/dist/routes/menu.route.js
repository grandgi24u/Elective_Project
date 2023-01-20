"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller = require('../controllers/menu.controller');
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkData = require('../middleware/checkData');
// @ts-ignore
const Item = require('../controllers/item.controller');
router.get('/', checkData.checkIfRestaurantExist, controller.getMenus);
router.get('/:idMenu', checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.getMenu);
router.post('/', checkData.checkRole, checkData.checkOwner, controller.createMenu);
router.delete('/:idMenu', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.deleteMenu);
router.patch('/:idMenu', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, controller.updateAnMenu);
router.post('/:idMenu/item_optional/', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, checkData.checkIfItemBind, Item.createItem);
router.post('/:idMenu/item_required/', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, checkData.checkIfItemBind, Item.createItem);
router.post('/:idMenu/bind_required_item/:idItem', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, checkData.checkIfItemExist, checkData.checkIfItemBind, controller.bindRequiredItem);
router.post('/:idMenu/bind_optional_item/:idItem', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, checkData.checkIfItemExist, checkData.checkIfItemBindOptionnal, controller.bindOptionalItem);
router.post('/:idMenu/unbind_required_item/:idItem', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, checkData.checkIfItemExist, checkData.checkIfItemBind, controller.unbindRequiredItem);
router.post('/:idMenu/unbind_optional_item/:idItem', checkData.checkRole, checkData.checkOwner, checkData.checkIfRestaurantExist, checkData.checkIfMenuExist, checkData.checkIfItemExist, checkData.checkIfItemBindOptionnal, controller.unbindOptionalItem);
module.exports = router;
