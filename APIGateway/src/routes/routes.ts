// @ts-ignore
import {authJwt, logger} from "../middleware";
const { fixRequestBody } = require('http-proxy-middleware');
const querystring = require('querystring');

const ROUTES = [
    {
        url: '/users',
        middleware: [authJwt.verifyToken, logger.routeAccess],
        proxy: {
            target: "http://localhost:3000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/users/, '/');
                newPath = `${newPath.split('?')[0]}?userId=${req.userId}`;
                return newPath;
            }
        }
    },
    {
        url: '/admin/users',
        middleware: [authJwt.verifyToken, authJwt.isAdmin],
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
        middleware: [authJwt.verifyToken, logger.routeAccess , authJwt.isCustomerOrRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/getrestaurant/, '/restaurant');
                const newQuery = req.userId ;
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
            pathRewrite: (path, req)=> {
                return path.replace(/^\/createRestaurant/, '/restaurant/createRestaurant');
            },
        }
    },

    {
        url: '/restaurant',
        middleware: [authJwt.verifyToken, logger.routeAccess, authJwt.isRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/restaurant/, '/restaurant');
                newPath = `${newPath.split('?')[0]}?${"roleId="+ req.roleId + "&userId=" + req.userId}`;
                console.log(newPath);
                return newPath;
            }
        }
    },

    {
        url: '/getorder',
        middleware: [authJwt.verifyToken, logger.routeAccess, authJwt.isCustomer],
        proxy: {
            target: "http://localhost:5000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/getorder/, '/order');
                newPath = `${newPath.split('?')[0]}?${"&userId=" + req.userId}`;
                console.log(newPath);
                return newPath;
            }
        }
    },

    {
        url: '/delivery',
        middleware: [authJwt.verifyToken, logger.routeAccess, authJwt.isDelivery],
        proxy: {
            target: "http://localhost:7000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/delivery/, '/delivery');
                newPath = `${newPath.split('?')[0]}?${"&userId=" + req.userId}`;
                console.log(newPath);
                return newPath;
            }
        }
    },

    {
        url: '/createDelivery',
        middleware: [],
        proxy: {
            target: "http://localhost:7000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                return path.replace(/^\/createDelivery/, '/delivery/createDelivery');
            },
        }
    },

    {
        url: '/getDelivery',
        middleware: [authJwt.verifyToken, logger.routeAccess, authJwt.isCustomerOrDelivery],
        proxy: {
            target: "http://localhost:7000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/getDelivery/, '/delivery');
                newPath = `${newPath.split('?')[0]}?${"&userId=" + req.userId}`;
                console.log(newPath);
                return newPath;
            }
        }
    },
]

exports.ROUTES = ROUTES;