"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: __dirname + "/../../.env" });
process.send = process.send || function () { };
exports.config = {
    isProduction: process.env.NODE_ENV === "production",
    appName: process.env.APP_NAME || "nestjs-boilerplate",
    appTitle: process.env.APP_TITLE || "nestjs-boilerplate",
    appDescription: process.env.APP_DESCRIPTION || "nestjs-boilerplate",
    apiVersion: process.env.API_VERSION || "1.0",
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT) || 3000,
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 10000,
    swaggerPath: process.env.SWAGGER_PATH || "/api",
    lit_endpoint: process.env.LIT_ENDPOINT || "",
    lit_did_endpoint: process.env.LIT_DID_ENDPOINT || "",
    led_code: process.env.LED_CODE || "",
    led_lit_code: process.env.LED_LIT_CODE || "",
    led_priv: process.env.LED_PRIVATE_KEYS || "",
    led_did_priv: process.env.LED_DID_PRIVATE_KEYS || "",
};
//# sourceMappingURL=index.js.map