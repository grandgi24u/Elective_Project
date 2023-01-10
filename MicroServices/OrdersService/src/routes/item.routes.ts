// @ts-ignore
const controller = require("../controllers/item.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });


router.get('/', controller.getItems);
router.get('/:id',  controller.getItem)
router.post('/', controller.createItem);
router.delete('/:id',  controller.deleteItem);


module.exports = router;