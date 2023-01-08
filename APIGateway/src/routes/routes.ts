// @ts-ignore
import {authJwt} from "../middleware";

const ROUTES = [
    {
        url: '/users',
        middleware: [authJwt.verifyToken],
        proxy: {
            target: "http://localhost:3000",
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
    }
]

exports.ROUTES = ROUTES;