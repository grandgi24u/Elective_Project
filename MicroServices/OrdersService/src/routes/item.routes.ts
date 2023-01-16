// @ts-ignore
const controller = require("../controllers/item.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkAllData = require("../middleware/checkAllData")

router.get('/', checkAllData.checkIfOrderExist, controller.getItems);
router.get('/:idItem', checkAllData.checkIfOrderExist, checkAllData.checkIfItemExist, controller.getItem)
router.post('/', checkAllData.checkOwner, checkAllData.checkIfOrderExist, checkAllData.checkIfItemExist, controller.createItem);
router.delete('/:idItem',  checkAllData.checkOwner, controller.deleteItem);
router.patch('/:idItem', checkAllData.checkOwner, checkAllData.checkIfOrderExist, checkAllData.checkIfItemExist, controller.updateAnItem);

module.exports = router;