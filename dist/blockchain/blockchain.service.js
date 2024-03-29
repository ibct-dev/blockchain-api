"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const crypto = __importStar(require("crypto"));
const time_1 = require("../shared/services/time");
const common_1 = require("@nestjs/common");
const eosjs_1 = require("eosjs");
const _config_1 = require("../config");
const eosjs_jssig_1 = require("eosjs/dist/eosjs-jssig");
const text_encoding_1 = require("text-encoding");
const http_error_1 = require("../common/errors/http.error");
const error_handler_service_1 = require("../shared/modules/error-handler/error-handler.service");
let BlockchainService = class BlockchainService {
    constructor(_errorService) {
        this._errorService = _errorService;
        const decoder = new text_encoding_1.TextDecoder('utf-8', { fatal: true, ignoreBOM: true, size: 8192 });
        const encoder = new text_encoding_1.TextEncoder('utf-8', { fatal: true, ignoreBOM: true, size: 8192 });
        this.endpoint = _config_1.config.lit_endpoint;
        this.rpc = new eosjs_1.JsonRpc(this.endpoint);
        this.api = new eosjs_1.Api({
            rpc: this.rpc,
            signatureProvider: new eosjs_jssig_1.JsSignatureProvider([]),
            textDecoder: decoder,
            textEncoder: encoder,
        });
        if (_config_1.config.lit_did_endpoint != undefined && _config_1.config.lit_did_endpoint != null && _config_1.config.lit_did_endpoint != "") {
            this.didendpoint = _config_1.config.lit_did_endpoint;
        }
        else {
            this.didendpoint = _config_1.config.lit_endpoint;
        }
        this.didrpc = new eosjs_1.JsonRpc(this.didendpoint);
        this.didapi = new eosjs_1.Api({
            rpc: this.didrpc,
            signatureProvider: new eosjs_jssig_1.JsSignatureProvider([]),
            textDecoder: decoder,
            textEncoder: encoder,
        });
    }
    gethello() {
        return `Hello World at ${(0, time_1.getTime)()}`;
    }
    async registerTraninfoTrx(vin, did, traninfo) {
        const inputParams = {
            vin: vin,
            did: did,
            traninfo: traninfo
        };
        try {
            return await this.registerTraninfoTrxFunc(inputParams);
        }
        catch (error) {
            console.log("SaaS registerTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }
    async selectTraninfoTrx(vin) {
        const inputParams = {
            vin: vin
        };
        try {
            return await this.selectTraninfoTrxFunc(inputParams);
        }
        catch (error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }
    sha256(input) {
        return crypto.createHash('sha256').update(input).digest('hex');
    }
    async registerTraninfoTrxFunc(arg) {
        try {
            const { vin, did, traninfo } = arg;
            const code = _config_1.config.led_lit_code;
            const accountId = _config_1.config.led_lit_code;
            console.log("accountId : ", accountId);
            console.log("code : ", code);
            console.log("vin : ", vin);
            this.didapi.signatureProvider = new eosjs_jssig_1.JsSignatureProvider(_config_1.config.led_priv.split(" "));
            const trx = await this.didapi.transact({
                actions: [
                    {
                        account: code,
                        name: "regtraninfo",
                        authorization: [
                            {
                                actor: code,
                                permission: "active",
                            },
                        ],
                        data: {
                            accountId,
                            vin,
                            did,
                            traninfo
                        },
                    },
                ],
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            const result = trx['processed'].action_traces[0].console;
            return result;
        }
        catch (error) {
            throw new http_error_1.TransactionExecuteException(error);
        }
    }
    async selectTraninfoTrxFunc(arg) {
        try {
            const { vin } = arg;
            const code = _config_1.config.led_lit_code;
            const accountId = _config_1.config.led_lit_code;
            this.didapi.signatureProvider = new eosjs_jssig_1.JsSignatureProvider(_config_1.config.led_priv.split(" "));
            console.log("selectDidPinTrx start :::::: ", vin);
            console.log("selectDidPinTrx accountId :::::: ", accountId);
            const trx = await this.didapi.transact({
                actions: [
                    {
                        account: code,
                        name: "seltraninfo",
                        authorization: [
                            {
                                actor: code,
                                permission: "active",
                            },
                        ],
                        data: {
                            accountId,
                            vin
                        },
                    },
                ],
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            console.log("selectTraninfoTrx result trx : ", trx);
            console.log("selectTraninfoTrx result trx['processed'].action_traces : ", trx['processed'].action_traces);
            const result = trx['processed'].action_traces[0].console;
            return result;
        }
        catch (error) {
            console.log("selectTraninfoTrx error : ", error.message);
            throw new http_error_1.TransactionExecuteException(error);
        }
    }
};
BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [error_handler_service_1.ErrorHandlerService])
], BlockchainService);
exports.BlockchainService = BlockchainService;
//# sourceMappingURL=blockchain.service.js.map