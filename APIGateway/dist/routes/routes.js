"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const middleware_1 = require("../middleware");
const { fixRequestBody } = require('http-proxy-middleware');
const querystring = require('querystring');
const ROUTES = [
    {
        url: '/users',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.logger.routeAccess],
        proxy: {
            target: "http://localhost:3000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/users/, '/');
                newPath = `${newPath.split('?')[0]}?userId=${req.userId}`;
                return newPath;
            }
        }
    },
    {
        url: '/admin/users',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.authJwt.isAdmin],
        proxy: {
            target: "http://localhost:3000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/admin/users`]: '',
            },
        }
    },
    {
        url: '/getrestaurant',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.logger.routeAccess, middleware_1.authJwt.isCustomerOrRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/getrestaurant/, '/restaurant');
                const newQuery = req.userId;
                console.log(newPath);
                return newPath;
            },
        }
    },
    {
        url: '/createRestaurant',
        middleware: [],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                return path.replace(/^\/createRestaurant/, '/restaurant/createRestaurant');
            },
        }
    },
    {
        url: '/restaurant',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.logger.routeAccess, middleware_1.authJwt.isRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/restaurant/, '/restaurant');
                newPath = `${newPath.split('?')[0]}?${"roleId=" + req.roleId + "&userId=" + req.userId}`;
                console.log(newPath);
                return newPath;
            }
        }
    },
    {
        url: '/getorder',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.authJwt.isCustomer],
        proxy: {
            target: "http://localhost:5000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/getorder`]: '/order',
            },
        }
    },
    {
        url: '/delivery',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.logger.routeAccess, middleware_1.authJwt.isDelivery],
        proxy: {
            target: "http://localhost:7000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/delivery/, '/delivery');
                newPath = `${newPath.split('?')[0]}?${"&userId=" + req.userId}`;
                console.log(newPath);
                return newPath;
            }
        }
    },
    {
        url: '/getDelivery',
        middleware: [middleware_1.authJwt.verifyToken, middleware_1.logger.routeAccess, middleware_1.authJwt.isCustomerOrDelivery],
        proxy: {
            target: "http://localhost:7000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                let newPath = path.replace(/^\/getDelivery/, '/delivery');
                newPath = `${newPath.split('?')[0]}?${"&userId=" + req.userId}`;
                console.log(newPath);
                return newPath;
            }
        }
    },
];
exports.ROUTES = ROUTES;
