// @ts-ignore
const controller = require("../controllers/menu.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });


router.get('/', controller.getMenus);
router.get('/:id',  controller.getMenu)
router.post('/', controller.createMenu);
router.delete('/:id',  controller.deleteMenu);


module.exports = router;