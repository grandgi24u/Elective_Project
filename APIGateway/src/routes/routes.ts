// @ts-ignore
import {authJwt} from "../middleware";
const { fixRequestBody } = require('http-proxy-middleware');

const ROUTES = [
    {
        url: '/users',
        middleware: [authJwt.verifyToken],
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
        middleware: [authJwt.verifyToken, authJwt.isCustomerOrRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/getrestaurant/, '/restaurant');
                console.log(req.userId)
                console.log("----------------------------------------")
                console.log(req.userId)

                const newQuery = { ...req.userId };
                newPath = `${newPath.split('?')[0]}?${JSON.stringify(newQuery)}`;
                return newPath;
            },
        }
    },

    {
        url: '/restaurant',
        middleware: [authJwt.verifyToken, authJwt.isRestaurant],
        proxy: {
            target: "http://localhost:6000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: (path, req)=> {
                let newPath = path.replace(/^\/restaurant/, '/restaurant');
                newPath = `${newPath.split('?')[0]}?userId=${req.userId}`;
                console.log(newPath);
                console.log("------------------------");
                return newPath;
            }
        }
    }
]

exports.ROUTES = ROUTES;