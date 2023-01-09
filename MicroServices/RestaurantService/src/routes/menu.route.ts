// @ts-ignore
const controller = require("../controllers/menu.controller");
// @ts-ignore
const express = require('express');
// @ts-ignore
const router = express.Router({ mergeParams: true });
// @ts-ignore
const MenuRoute = require('./menu.route');

router.get('/', controller.getMenus);
router.get('/:idMenu',  controller.getMenu)
router.post('/', controller.createMenu);
router.delete('/:idMenu',  controller.deleteMenu);

module.exports = router;