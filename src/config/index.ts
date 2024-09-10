/* eslint-disable @typescript-eslint/no-empty-function */
import { config as _config } from "dotenv";
_config({ path: __dirname + "/../../.env" });
(process as any).send = process.send || function() {};

export const config = {
    // Base
    isProduction: process.env.NODE_ENV === "production",
    // General
    appName: process.env.APP_NAME || "nestjs-boilerplate",
    appTitle: process.env.APP_TITLE || "nestjs-boilerplate",
    appDescription: process.env.APP_DESCRIPTION || "nestjs-boilerplate",
    // API
    apiVersion: process.env.API_VERSION || "1.0",
    // Server
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT) || 3000,
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 10000,
    swaggerPath: process.env.SWAGGER_PATH || "/api",
    // Contract
    lit_endpoint: process.env.LIT_ENDPOINT || "",
    lit_did_endpoint: process.env.LIT_DID_ENDPOINT || "",
    led_code: process.env.LED_CODE || "",
    led_lit_code: process.env.LED_LIT_CODE || "",
    actor_code: process.env.ACTOR_CODE || "",

    //Led key
    led_priv: process.env.LED_PRIVATE_KEYS || "",
    led_did_priv: process.env.LED_DID_PRIVATE_KEYS || "",
};



