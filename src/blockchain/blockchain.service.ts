/* eslint-disable security/detect-object-injection */
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import { getTime } from "@src/shared/services/time";
import { Inject, Injectable } from "@nestjs/common";
import { Api, JsonRpc } from "eosjs";
import { config } from "@config";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { TextDecoder, TextEncoder } from "text-encoding";

import {
    RpcCallException,
    TransactionExecuteException,
} from "@src/common/errors/http.error";

import {
    IBlockchainService,
    IRegisterBnoInfoActionInput,
    IDeleteBnoInfoActionInput,
    ISelectBnoInfoActionInput
} from "./blockchain.interface";

import { ErrorHandlerService } from "@shared/modules/error-handler/error-handler.service";

@Injectable()
export class BlockchainService implements IBlockchainService {
    readonly endpoint: string;
    readonly didendpoint: string;
    readonly rpc: JsonRpc;
    readonly didrpc: JsonRpc;
    readonly code: string;
    readonly creator: string;
    readonly account: string;

    api: Api;
    didapi: Api;
    constructor(
        // @Inject("BlockchainService")
        private readonly _errorService: ErrorHandlerService,
    ) {
        const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true, size: 8192 });
        const encoder = new TextEncoder('utf-8', { fatal: true, ignoreBOM: true, size: 8192 });

        this.endpoint = config.lit_endpoint;
        this.rpc = new JsonRpc(this.endpoint);
        this.api = new Api({
            rpc: this.rpc,
            signatureProvider: new JsSignatureProvider([]),
            textDecoder: decoder,
            textEncoder: encoder,
        });

        if(config.lit_did_endpoint!=undefined && config.lit_did_endpoint!=null && config.lit_did_endpoint != "") {
            this.didendpoint = config.lit_did_endpoint;
        } else { 
            this.didendpoint = config.lit_endpoint;
        }

        this.didrpc = new JsonRpc(this.didendpoint);
        this.didapi = new Api({
            rpc: this.didrpc,
            signatureProvider: new JsSignatureProvider([]),
            textDecoder: decoder,
            textEncoder: encoder,
        });
    }

    gethello(): string {
        return `Hello World at ${getTime()}`;
    }

    async registerBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any> {
        const inputParams = {
            bnoinfo: bnoinfo
        }

        try {
            const bno = bnoinfo.bno;
            const selectParams: ISelectBnoInfoActionInput = {
                bno: bno,
                title: "",
                model: "",
                year: "",
                brand: "",
                frame: "",
                bid: "",
                regidt: ""
            }
            const chk = await this.selectBnoInfoTrx(selectParams);
            if(JSON.stringify(chk).indexOf("FAIL") == -1) {
                throw new Error("Data already exists in table");    
            }
        } catch(error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }

        try {
            return await this.registerBnoInfoTrxFunc(bnoinfo);
        } catch(error) {
            console.log("SaaS registerTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }

    getCurrentDateTime(): string {
        const now: Date = new Date();
        const offset: number = 9; // KST is UTC+9
        const localTime: Date = new Date(now.getTime() + offset * 60 * 60 * 1000);
        const year: number = localTime.getFullYear();
        const month: number = localTime.getMonth() + 1; // Month is zero-based
        const day: number = localTime.getDate();
        const hours: number = localTime.getHours();
        const minutes: number = localTime.getMinutes();
        const seconds: number = localTime.getSeconds();
    
        const formattedDate: string = `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
        const formattedTime: string = `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
    
        return `${formattedDate} ${formattedTime}`;
    }
    
    padNumber(number: number): string {
        return number < 10 ? `0${number}` : `${number}`;
    }

    async updateBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any> {
        const inputParams = {
            bnoinfo: bnoinfo
        }

        try {
            const bno = bnoinfo.bno;
            const selectParams: ISelectBnoInfoActionInput = {
                bno: bno,
                title: "",
                model: "",
                year: "",
                brand: "",
                frame: "",
                bid: "",
                regidt: ""
            }
            const chk = await this.selectBnoInfoTrx(selectParams);
            if(JSON.stringify(chk).indexOf("FAIL") != -1) {
                throw new Error("Data is not found.");    
            }
        } catch(error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }

        try {
            return await this.updateBnoInfoTrxFunc(bnoinfo);
        } catch(error) {
            console.log("SaaS updateBnoInfoTrx error : ", error);
            throw new Error(error);
        }
    }

    async deleteBnoInfoTrx(bnoinfo: IDeleteBnoInfoActionInput): Promise<any> {
        const inputParams = {
            bnoinfo: bnoinfo
        }

        try {
            const bno = bnoinfo.bno;
            const selectParams: ISelectBnoInfoActionInput = {
                bno: bno,
                title: "",
                model: "",
                year: "",
                brand: "",
                frame: "",
                bid: "",
                regidt: ""
            }
            const chk = await this.selectBnoInfoTrx(selectParams);
            if(JSON.stringify(chk).indexOf("FAIL") != -1) {
                throw new Error("Data is not found.");    
            }
        } catch(error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }

        try {
            return await this.deleteBnoInfoTrxFunc(bnoinfo);
        } catch(error) {
            console.log("SaaS deleteBnoInfoTrx error : ", error);
            throw new Error(error);
        }
    }


    async selectBnoInfoTrx(bnoinfo: ISelectBnoInfoActionInput): Promise<any> {
        try {
            return await this.selectBnoInfoTrxFunc(bnoinfo);
        } catch(error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }



        
    sha256(input: string): string {
        return crypto.createHash('sha256').update(input).digest('hex');
    }

    async registerBnoInfoTrxFunc (arg: IRegisterBnoInfoActionInput): Promise<any> {
        try {
            // const { bnoinfo } = arg;

            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;

            // console.log("accountId : ", accountId);
            // console.log("code : ", code);
            // const bno = JSON.parse(JSON.stringify(bnoinfo)).bno;
            // console.log("bno : ", bno);
            // const eos = new BlockchainService();

            this.didapi.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            const bid = uuidv4();
            const regidt = this.getCurrentDateTime();

            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            // console.log("eos.api.transact start : ", privtKey);
            const trx = await this.didapi.transact(
                {
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
                                photos: arg.photos,
                                bid: bid,
                                regidt: regidt
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );
            const result = {
                // objecId : trx['processed'].id //.action_traces[0].console;
                bid : bid //.action_traces[0].console;
            }
            return result;
        } catch (error) {
            throw new TransactionExecuteException(error);
        }
    }

    async updateBnoInfoTrxFunc (arg: IRegisterBnoInfoActionInput): Promise<any> {
        try {
            // const { bnoinfo } = arg;

            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;

            console.log("accountId : ", accountId);
            console.log("code : ", code);
            // const bno = JSON.parse(JSON.stringify(bnoinfo)).bno;
            // console.log("bno : ", bno);
            // const eos = new BlockchainService();

            this.didapi.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            // console.log("eos.api.transact start : ", privtKey);
            const trx = await this.didapi.transact(
                {
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
                                photos: arg.photos,
                                bid: arg.bid,
                                regidt: arg.regidt
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );
            const result = {
                objecId : trx['processed'].id //.action_traces[0].console;
            }
            return result;
        } catch (error) {
            throw new TransactionExecuteException(error);
        }
    }

    async deleteBnoInfoTrxFunc (arg: IDeleteBnoInfoActionInput): Promise<any> {
        try {
            // const { bnoinfo } = arg;

            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;

            console.log("accountId : ", accountId);
            console.log("code : ", code);
            // const bno = JSON.parse(JSON.stringify(bnoinfo)).bno;
            // console.log("bno : ", bno);
            // const eos = new BlockchainService();

            this.didapi.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            // console.log("eos.api.transact start : ", privtKey);
            const trx = await this.didapi.transact(
                {
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
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );
            const result = {
                objecId : trx['processed'].id //.action_traces[0].console;
            }
            return result;
        } catch (error) {
            throw new TransactionExecuteException(error);
        }
    }

    async selectBnoInfoTrxFunc(arg: ISelectBnoInfoActionInput): Promise<any> {
        try {
            // const { bno } = arg;
   
            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;
            // const eos = new BlockchainService();
            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            this.didapi.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            // console.log("selectBnoInfoTrx start :::::: ", bno);
            console.log("selectBnoInfoTrx arg :::::: ", arg);

            const trx = await this.didapi.transact(
                {
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
                                frame: arg.frame,
                                bid: arg.bid,
                                regidt: arg.regidt
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );

            // console.log("selectBnoInfoTrx result trx : ", trx);
            // console.log("selectBnoInfoTrx result trx['processed'].action_traces : ", trx['processed'].action_traces);

            const result = trx['processed'].action_traces[0].console;
            const jsonArray = JSON.parse(result);
            const output = jsonArray.map(item => {
                const photosArray = item.photos.split(',');
                return {
                    ...item,
                    photos: photosArray
                };
            });



            // const input  = JSON.parse(result);
            // const photosArray = JSON.parse(result).photos.split(',');

            // const output = {
            //     ...input,
            //     photos: photosArray
            // }
            try {
                return output;
                
            } catch(error) {
                return result;
            }
        } catch (error) {
            console.log("selectBnoInfoTrx error : ", error.message);
            // throw new TransactionExecuteException(error);
            // throw new Error("There is no data you searched for in the table.");
            return "FAIL[There is no data you searched for in the table.]";
        }
    }


}
