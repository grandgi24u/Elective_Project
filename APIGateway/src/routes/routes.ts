const ROUTES = [
    {
        url: '/all',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3000",
            changeOrigin: true,
            pathRewrite: {
                [`^/all`]: '',
            },
        }
    },
    {
        url: '/customer',
        auth: true,
        creditCheck: true,
        proxy: {
            target: "http://localhost:3000",
            changeOrigin: true,
            pathRewrite: {
                [`^/customer`]: '',
            },
        }
    }
]

exports.ROUTES = ROUTES;