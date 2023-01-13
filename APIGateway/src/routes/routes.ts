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
        middleware: [authJwt.verifyToken,logger.routeAccess , authJwt.isCustomerOrRestaurant],
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
        url: '/restaurant',
        middleware: [authJwt.verifyToken, logger.routeAccess, authJwt.isRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/restaurant/, '/restaurant');
                newPath = `${newPath.split('?')[0]}?${"roleId="+ req.roleId + "&userId=" + req.userId}`;
                return newPath;
            }
        }
    }
]

exports.ROUTES = ROUTES;