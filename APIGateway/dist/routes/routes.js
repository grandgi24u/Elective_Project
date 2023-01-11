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
    }
];
exports.ROUTES = ROUTES;
