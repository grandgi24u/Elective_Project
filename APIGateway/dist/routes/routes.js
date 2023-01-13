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
    }
];
exports.ROUTES = ROUTES;
