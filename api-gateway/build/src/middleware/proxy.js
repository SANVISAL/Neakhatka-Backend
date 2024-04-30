"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_middleware_1 = require("http-proxy-middleware");
const routes_def_1 = require("../routes-def");
const logger_1 = require("../utils/logger");
const createCofig_1 = __importDefault(require("@api-gateway/utils/createCofig"));
const consts_1 = require("../utils/consts");
const config = (0, createCofig_1.default)();
// Define the proxy rules and targets
const proxyConfigs = {
    [routes_def_1.ROUTE_PATHS.AUTH_SERVICE]: {
        // target: config.authServiceUrl,
        changeOrigin: true,
        selfHandleResponse: true,
        pathRewrite: (path, _req) => `${routes_def_1.ROUTE_PATHS.AUTH_SERVICE}${path}`,
        on: {
            proxyReq: (proxyReq, req, _res) => {
                logger_1.logger.info(`Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
                logger_1.logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
                const expressReq = req;
                // Extract JWT token from session
                const token = expressReq.session.jwt;
                proxyReq.setHeader('Authorization', `Bearer ${token}`);
            },
            proxyRes: (proxyRes, req, res) => {
                let originalBody = [];
                proxyRes.on('data', function (chunk) {
                    originalBody.push(chunk);
                });
                proxyRes.on('end', function () {
                    const bodyString = Buffer.concat(originalBody).toString('utf8');
                    let responseBody;
                    try {
                        responseBody = JSON.parse(bodyString);
                        // If Response Error, Not Modified Response
                        if (responseBody.errors) {
                            return res.status(proxyRes.statusCode).json(responseBody);
                        }
                        // Store JWT in session
                        if (responseBody.token) {
                            req.session.jwt = responseBody.token;
                        }
                        // Modify response to send only the message to the client
                        res.json({ message: responseBody.message });
                    }
                    catch (error) {
                        return res.status(500).json({ message: "Error parsing response" });
                    }
                });
            },
            error: (err, _req, res) => {
                logger_1.logger.error(`Proxy Error: ${err}`);
                switch (err.code) {
                    case 'ECONNREFUSED':
                        res.status(consts_1.StatusCode.ServiceUnavailable).json({ message: "The service is temporarily unavailable. Please try again later." });
                        break;
                    case 'ETIMEDOUT':
                        res.status(consts_1.StatusCode.GatewayTimeout).json({ message: "The request timed out. Please try again later." });
                        break;
                    default:
                        res.status(consts_1.StatusCode.InternalServerError).json({ message: "An internal error occurred." });
                }
            }
        },
    },
};
const applyProxy = (app) => {
    Object.keys(proxyConfigs).forEach((context) => {
        app.use(context, (0, http_proxy_middleware_1.createProxyMiddleware)(proxyConfigs[context]));
    });
};
exports.default = applyProxy;
//# sourceMappingURL=proxy.js.map