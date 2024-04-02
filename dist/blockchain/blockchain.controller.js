"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainController = exports.BlockchainControllerPing = void 0;
const common_1 = require("@nestjs/common");
const http_error_1 = require("../common/errors/http.error");
let BlockchainControllerPing = class BlockchainControllerPing {
    gethello() {
        return "";
    }
};
__decorate([
    (0, common_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], BlockchainControllerPing.prototype, "gethello", null);
BlockchainControllerPing = __decorate([
    (0, common_1.Controller)("")
], BlockchainControllerPing);
exports.BlockchainControllerPing = BlockchainControllerPing;
let BlockchainController = class BlockchainController {
    constructor(_blockchainService) {
        this._blockchainService = _blockchainService;
    }
    async registerBnoInfoTrx(body) {
        try {
            const rslt = await this._blockchainService.registerBnoInfoTrx(body);
            return rslt;
        }
        catch (error) {
            throw new http_error_1.BadRequestException(error.message, {
                context: "BlockchainController/registerBnoInfoTrx"
            });
        }
    }
    async updateBnoInfoTrx(body) {
        try {
            const rslt = await this._blockchainService.updateBnoInfoTrx(body);
            return rslt;
        }
        catch (error) {
            throw new http_error_1.BadRequestException(error.message, {
                context: "BlockchainController/updateBnoInfoTrx"
            });
        }
    }
    async deleteBnoInfoTrx(body) {
        try {
            const rslt = await this._blockchainService.deleteBnoInfoTrx(body);
            return rslt;
        }
        catch (error) {
            throw new http_error_1.BadRequestException(error.message, {
                context: "BlockchainController/deleteBnoInfoTrx"
            });
        }
    }
    async selectBnoInfoTrx(body) {
        try {
            const rslt = await this._blockchainService.selectBnoInfoTrx(body);
            return rslt;
        }
        catch (error) {
            throw new http_error_1.BadRequestException(error.message, {
                context: "BlockchainController/selectBnoInfoTrx"
            });
        }
    }
};
__decorate([
    (0, common_1.Post)("registerBnoInfoTrx"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "registerBnoInfoTrx", null);
__decorate([
    (0, common_1.Post)("updateBnoInfoTrx"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "updateBnoInfoTrx", null);
__decorate([
    (0, common_1.Post)("deleteBnoInfoTrx"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "deleteBnoInfoTrx", null);
__decorate([
    (0, common_1.Post)("selectBnoInfoTrx"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockchainController.prototype, "selectBnoInfoTrx", null);
BlockchainController = __decorate([
    (0, common_1.Controller)("SaaS"),
    __param(0, (0, common_1.Inject)("BlockchainService")),
    __metadata("design:paramtypes", [Object])
], BlockchainController);
exports.BlockchainController = BlockchainController;
//# sourceMappingURL=blockchain.controller.js.map