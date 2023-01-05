const { createProxyMiddleware } = require('http-proxy-middleware');

// @ts-ignore
const setupProxies = (app, routes) => {
    // @ts-ignore
    for(let route of routes) {
        app.use(route.url, createProxyMiddleware(route.proxy));
    }
}

exports.setupProxies = setupProxies