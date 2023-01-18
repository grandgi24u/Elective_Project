// @ts-ignore
const controller = require("../controllers/item.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const checkAllData = require("../middleware/checkAllData")

router.post('/', checkAllData.checkOwner, checkAllData.checkIfOrderExist, controller.createItem);
router.delete('/:itemId',  checkAllData.checkOwner, controller.deleteItem);
router.post('/optional/', checkAllData.checkOwner, checkAllData.checkIfOrderExist, controller.createOptionalItem);
router.delete('/optional/:itemOptionalId',  checkAllData.checkOwner, controller.deleteOptionalItem);

module.exports = router;