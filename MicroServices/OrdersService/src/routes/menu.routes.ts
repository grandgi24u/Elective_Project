// @ts-ignore
import ItemRoute from "./item.route";
// @ts-ignore
const controller = require("../controllers/menu.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkAllData = require("../middleware/checkAllData")
// @ts-ignore
const Item = require('../controllers/item.controller');

router.get('/', controller.getMenus);
router.get('/:idMenu',  controller.getMenu)
router.post('/', checkAllData.checkIfOrderExist, controller.createMenu);
router.delete('/:idMenu',  controller.deleteMenu);
router.patch('/:idMenu', checkAllData.checkIfOrderExist, checkAllData.checkIfMenuExist, controller.updateAnMenu);

router.post('/:idMenu/item_optional/',checkAllData.checkIfOrderExist, Item.createItem)
router.post('/:idMenu/item_required/',checkAllData.checkIfOrderExist, Item.createItem)

router.post('/:idMenu/bind_required_item/:idItem',checkAllData.checkIfOrderExist, controller.bindRequiredItem);
router.post('/:idMenu/bind_optional_item/:idItem',checkAllData.checkIfOrderExist, controller.bindOptionalItem);

router.post('/:idMenu/unbind_required_item/:idItem',checkAllData.checkIfOrderExist, controller.unbindRequiredItem);
router.post('/:idMenu/unbind_optional_item/:idItem',checkAllData.checkIfOrderExist, controller.unbindOptionalItem);

module.exports = router;