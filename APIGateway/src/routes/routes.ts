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
        middleware: [authJwt.verifyToken, authJwt.isAdmin],
        proxy: {
            target: "http://localhost:3000",
            onProxyReq: fixRequestBody,
            changeOrigin: true,
            pathRewrite: {
                [`^/updateStatus/:id`]: '/updateStatus/:id',
            },
        }
    }
]

exports.ROUTES = ROUTES;