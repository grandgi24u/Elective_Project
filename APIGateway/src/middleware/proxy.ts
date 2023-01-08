const { createProxyMiddleware } = require('http-proxy-middleware');
// @ts-ignore
const { authJwt } = require("../middleware");

// @ts-ignore
const setupProxies = (app, routes) => {
    // @ts-ignore
    for(let route of routes) {
        if(route.middleware.length > 0) {
            app.use(route.url, route.middleware, createProxyMiddleware(route.proxy));
        } else {
            app.use(route.url, createProxyMiddleware(route.proxy));
        }
    }
}

exports.setupProxies = setupProxies