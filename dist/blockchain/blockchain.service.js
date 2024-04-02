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
    async registerBnoInfoTrx(bnoinfo) {
        const inputParams = {
            bnoinfo: bnoinfo
        };
        try {
            const bno = bnoinfo.bno;
            const selectParams = {
                bno: bno,
                title: "",
                model: "",
                year: "",
                brand: "",
                frame: ""
            };
            const chk = await this.selectBnoInfoTrx(selectParams);
            if (JSON.stringify(chk).indexOf("FAIL") == -1) {
                throw new Error("Data already exists in table");
            }
        }
        catch (error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }
        try {
            return await this.registerBnoInfoTrxFunc(bnoinfo);
        }
        catch (error) {
            console.log("SaaS registerTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }
    async updateBnoInfoTrx(bnoinfo) {
        const inputParams = {
            bnoinfo: bnoinfo
        };
        try {
            const bno = bnoinfo.bno;
            const selectParams = {
                bno: bno,
                title: "",
                model: "",
                year: "",
                brand: "",
                frame: ""
            };
            const chk = await this.selectBnoInfoTrx(selectParams);
            if (JSON.stringify(chk).indexOf("FAIL") != -1) {
                throw new Error("Data is not found.");
            }
        }
        catch (error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }
        try {
            return await this.updateBnoInfoTrxFunc(bnoinfo);
        }
        catch (error) {
            console.log("SaaS updateBnoInfoTrx error : ", error);
            throw new Error(error);
        }
    }
    async deleteBnoInfoTrx(bnoinfo) {
        const inputParams = {
            bnoinfo: bnoinfo
        };
        try {
            const bno = bnoinfo.bno;
            const selectParams = {
                bno: bno,
                title: "",
                model: "",
                year: "",
                brand: "",
                frame: ""
            };
            const chk = await this.selectBnoInfoTrx(selectParams);
            if (JSON.stringify(chk).indexOf("FAIL") != -1) {
                throw new Error("Data is not found.");
            }
        }
        catch (error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }
        try {
            return await this.deleteBnoInfoTrxFunc(bnoinfo);
        }
        catch (error) {
            console.log("SaaS deleteBnoInfoTrx error : ", error);
            throw new Error(error);
        }
    }
    async selectBnoInfoTrx(bnoinfo) {
        try {
            return await this.selectBnoInfoTrxFunc(bnoinfo);
        }
        catch (error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }
    sha256(input) {
        return crypto.createHash('sha256').update(input).digest('hex');
    }
    async registerBnoInfoTrxFunc(arg) {
        try {
            const code = _config_1.config.led_lit_code;
            const accountId = _config_1.config.led_lit_code;
            console.log("accountId : ", accountId);
            console.log("code : ", code);
            this.didapi.signatureProvider = new eosjs_jssig_1.JsSignatureProvider(_config_1.config.led_priv.split(" "));
            const trx = await this.didapi.transact({
                actions: [
                    {
                        account: code,
                        name: "regbnoinfo",
                        authorization: [
                            {
                                actor: code,
                                permission: "active",
                            },
                        ],
                        data: {
                            accountId,
                            bno: arg.bno,
                            title: arg.title,
                            model: arg.model,
                            year: arg.year,
                            brand: arg.brand,
                            frame: arg.frame,
                            photos: arg.photos
                        },
                    },
                ],
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            const result = {
                objecId: trx['processed'].id
            };
            return result;
        }
        catch (error) {
            throw new http_error_1.TransactionExecuteException(error);
        }
    }
    async updateBnoInfoTrxFunc(arg) {
        try {
            const code = _config_1.config.led_lit_code;
            const accountId = _config_1.config.led_lit_code;
            console.log("accountId : ", accountId);
            console.log("code : ", code);
            this.didapi.signatureProvider = new eosjs_jssig_1.JsSignatureProvider(_config_1.config.led_priv.split(" "));
            const trx = await this.didapi.transact({
                actions: [
                    {
                        account: code,
                        name: "udtbnoinfo",
                        authorization: [
                            {
                                actor: code,
                                permission: "active",
                            },
                        ],
                        data: {
                            accountId,
                            bno: arg.bno,
                            title: arg.title,
                            model: arg.model,
                            year: arg.year,
                            brand: arg.brand,
                            frame: arg.frame,
                            photos: arg.photos
                        },
                    },
                ],
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            const result = {
                objecId: trx['processed'].id
            };
            return result;
        }
        catch (error) {
            throw new http_error_1.TransactionExecuteException(error);
        }
    }
    async deleteBnoInfoTrxFunc(arg) {
        try {
            const code = _config_1.config.led_lit_code;
            const accountId = _config_1.config.led_lit_code;
            console.log("accountId : ", accountId);
            console.log("code : ", code);
            this.didapi.signatureProvider = new eosjs_jssig_1.JsSignatureProvider(_config_1.config.led_priv.split(" "));
            const trx = await this.didapi.transact({
                actions: [
                    {
                        account: code,
                        name: "delbnoinfo",
                        authorization: [
                            {
                                actor: code,
                                permission: "active",
                            },
                        ],
                        data: {
                            accountId,
                            bno: arg.bno
                        },
                    },
                ],
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            const result = {
                objecId: trx['processed'].id
            };
            return result;
        }
        catch (error) {
            throw new http_error_1.TransactionExecuteException(error);
        }
    }
    async selectBnoInfoTrxFunc(arg) {
        try {
            const code = _config_1.config.led_lit_code;
            const accountId = _config_1.config.led_lit_code;
            this.didapi.signatureProvider = new eosjs_jssig_1.JsSignatureProvider(_config_1.config.led_priv.split(" "));
            console.log("selectBnoInfoTrx arg :::::: ", arg);
            const trx = await this.didapi.transact({
                actions: [
                    {
                        account: code,
                        name: "selbnoinfo",
                        authorization: [
                            {
                                actor: code,
                                permission: "active",
                            },
                        ],
                        data: {
                            accountId,
                            bno: arg.bno,
                            title: arg.title,
                            model: arg.model,
                            year: arg.year,
                            brand: arg.brand,
                            frame: arg.frame
                        },
                    },
                ],
            }, {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            console.log("selectBnoInfoTrx result trx : ", trx);
            console.log("selectBnoInfoTrx result trx['processed'].action_traces : ", trx['processed'].action_traces);
            const result = trx['processed'].action_traces[0].console;
            const jsonArray = JSON.parse(result);
            const output = jsonArray.map(item => {
                const photosArray = item.photos.split(',');
                return Object.assign(Object.assign({}, item), { photos: photosArray });
            });
            try {
                return output;
            }
            catch (error) {
                return result;
            }
        }
        catch (error) {
            console.log("selectBnoInfoTrx error : ", error.message);
            return "FAIL[There is no data you searched for in the table.]";
        }
    }
};
BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [error_handler_service_1.ErrorHandlerService])
], BlockchainService);
exports.BlockchainService = BlockchainService;
//# sourceMappingURL=blockchain.service.js.map