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


// router.get('/', controller.getMenus, checkAllData.checkIfOrderExist);
// router.get('/:idMenu',  controller.getMenu, checkAllData.checkIfMenuExist, checkAllData.checkIfOrderExist)
router.post('/', checkAllData.checkOwner, checkAllData.checkIfOrderExist, controller.createMenu);
router.delete('/:idMenu',  checkAllData.checkOwner, controller.deleteMenu, checkAllData.checkIfOrderExist);
// router.patch('/:idMenu', checkAllData.checkOwner, checkAllData.checkIfOrderExist, checkAllData.checkIfMenuExist, controller.updateAnMenu);

// router.post('/:idMenu/item_optional/',checkAllData.checkOwner, checkAllData.checkIfOrderExist, checkAllData.checkIfMenuExist, Item.createItem)
// router.post('/:idMenu/item_required/',checkAllData.checkOwner, checkAllData.checkIfOrderExist, checkAllData.checkIfMenuExist, Item.createItem)

module.exports = router;