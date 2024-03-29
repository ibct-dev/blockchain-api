"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainModule = void 0;
const common_1 = require("@nestjs/common");
const blockchain_controller_1 = require("./blockchain.controller");
const blockchain_service_1 = require("./blockchain.service");
const async_local_storage_module_1 = require("../shared/modules/async-local-storage/async-local-storage.module");
const error_handler_module_1 = require("../shared/modules/error-handler/error-handler.module");
let BlockchainModule = class BlockchainModule {
};
BlockchainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            async_local_storage_module_1.AsyncLocalStorageModule,
            error_handler_module_1.ErrorHandlerModule,
        ],
        controllers: [blockchain_controller_1.BlockchainController, blockchain_controller_1.BlockchainControllerPing],
        providers: [blockchain_service_1.BlockchainService],
    })
], BlockchainModule);
exports.BlockchainModule = BlockchainModule;
//# sourceMappingURL=blockchain.module.js.map