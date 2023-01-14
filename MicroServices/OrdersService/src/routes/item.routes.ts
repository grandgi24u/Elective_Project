// @ts-ignore
const controller = require("../controllers/item.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkAllData = require("../middleware/checkAllData")

router.get('/', controller.getItems);
router.get('/:idItem',  controller.getItem)
router.post('/', checkAllData.checkIfOrderExist, controller.createItem);
router.delete('/:idItem',  controller.deleteItem);
router.patch('/:idItem', checkAllData.checkIfOrderExist, controller.updateAnItem);

module.exports = router;