"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const middleware_1 = require("../middleware");
const { fixRequestBody } = require('http-proxy-middleware');
const ROUTES = [
    {
        url: '/users',
        middleware: [middleware_1.authJwt.verifyToken],
        proxy: {
            target: "http://localhost:3000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/users`]: '',
                [`^/users/getUsers`]: '/getUsers',
                [`^/users/createUser`]: '/createUser',
                [`^/users/getUser/:id`]: '/getUser/:id',
                [`^/users/deleteUser/:id`]: '/deleteUser/:id',
                [`^/users/updateUser/:id`]: '/updateUser/:id',
            },
        }
    },
    {
        url: '/updateStatus',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.authJwt.isAdmin],
        proxy: {
            target: "http://localhost:3000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/updateStatus/:id`]: '/updateStatus/:id',
            },
        }
    },
    {
        url: '/admin',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.authJwt.isAdmin],
        proxy: {
            target: "http://localhost:3000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/admin/search`]: '/search',
            },
        }
    },
    {
        url: '/getrestaurant',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.authJwt.isCustomerOrRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/getrestaurant/getall`]: '/restaurant/',
                [`^/getrestaurant/getone/:id`]: '/restaurant/:id',
                [`^/getrestaurant/getone/:id/menu/getall`]: '/restaurant/:id/menu/',
                [`^/getrestaurant/getone/:id/menu/getone/:idMenu`]: '/restaurant/:id/menu/:idMenu',
                [`^/getrestaurant/getone/:id/item/getall`]: '/restaurant/:id/item/',
                [`^/getrestaurant/getone/:id/item/getone/:idItem`]: '/restaurant/:id/item/:idItem',
            },
        }
    },
    {
        url: '/restaurant',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.authJwt.isRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/restaurant/create`]: '/restaurant/',
                [`^/restaurant/patch/:id`]: '/restaurant/:id',
                [`^/restaurant/delete/:id`]: '/restaurant/:id',
                [`^/restaurant/:id/menu/create`]: '/restaurant/:id/menu/',
                [`^/restaurant/:id/menu//patch/:idMenu`]: '/restaurant/:id/menu/:idMenu',
                [`^/restaurant/:id/menu//delete/:idMenu`]: '/restaurant/:id/menu/:idMenu',
                [`^/restaurant/:id/item/create`]: '/restaurant/:id/item/',
                [`^/restaurant/:id/item//patch/:idItem`]: '/restaurant/:id/item/:idItem',
                [`^/restaurant/:id/item//delete/:idItem`]: '/restaurant/:id/item/:idItem',
                [`^/restaurant/:id/menu/:idMenu/createItem/required`]: '/restaurant/:id/menu/:idMenu/item_required/:idItem',
                [`^/restaurant/:id/menu/:idMenu/createItem/optional`]: '/restaurant/:id/menu/:idMenu/item_optional/:idItem',
                [`^/restaurant/:id/menu/:idMenu/bindItem/required`]: '/restaurant/:id/menu/:idMenu/bind_required_item/:idItem',
                [`^/restaurant/:id/menu/:idMenu/bindItem/optional`]: '/restaurant/:id/menu/:idMenu/bind_optional_item/:idItem',
                [`^/restaurant/:id/menu/:idMenu/unbindItem/required`]: '/restaurant/:id/menu/:idMenu/unbind_required_item/:idItem',
                [`^/restaurant/:id/menu/:idMenu/unbindItem/optional`]: '/restaurant/:id/menu/:idMenu/unbind_optional_item/:idItem',
            },
        }
    }
];
exports.ROUTES = ROUTES;
