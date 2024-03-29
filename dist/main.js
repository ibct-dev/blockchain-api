"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cls_rtracer_1 = __importDefault(require("cls-rtracer"));
const app_module_1 = require("./app.module");
const _config_1 = require("./config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
require("cross-fetch/polyfill");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    try {
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.use(cls_rtracer_1.default.expressMiddleware());
        app.use((0, helmet_1.default)());
        app.use((0, express_rate_limit_1.default)({
            windowMs: 1000 * 60 * 60,
            max: _config_1.config.rateLimitMax,
            message: "⚠️  Too many request created from this IP, please try again after an hour",
        }));
        app.use((0, morgan_1.default)("tiny", {
            skip(req, res) {
                return res.statusCode < 400;
            },
        }));
        await app.listen(_config_1.config.port, () => {
            !_config_1.config.isProduction
                ? console.info(`🚀  Server ready at http://${_config_1.config.host}:${_config_1.config.port}/${_config_1.config.apiVersion}`, { context: "BootStrap" })
                : console.info(`🚀  Server is listening on port ${_config_1.config.port}`, { context: "BootStrap" });
            !_config_1.config.isProduction &&
                console.info(`🚀  Subscriptions ready at ws://${_config_1.config.host}:${_config_1.config.port}/${_config_1.config.apiVersion}`, { context: "BootStrap" });
        });
    }
    catch (error) {
        console.error(`❌  Error starting server, ${error}`, {
            context: "BootStrap",
        });
        process.exit();
    }
}
bootstrap();
//# sourceMappingURL=main.js.map