/* eslint-disable security/detect-object-injection */
import { v4 as uuidv4 } from 'uuid';
import bs58 from "bs58";
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
    ISelectBnoInfoActionInput,
    IRegisterWrbtsInfActionInput,
    ISelectWrbtsInfActionInput
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

            const code = config.actor_code;
            const actor_code = config.actor_code;
            // const privtKey = config.led_priv;
            const accountId = config.actor_code;

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
                                    actor: actor_code,
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
                trxId : this.convertToUpperCase(trx['processed'].id), //.action_traces[0].console;
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

            const code = config.actor_code;
            const actor_code = config.actor_code;
            // const privtKey = config.led_priv;
            const accountId = config.actor_code;

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
                                    actor: actor_code,
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

            const code = config.actor_code;
            const actor_code = config.actor_code;
            // const privtKey = config.led_priv;
            const accountId = config.actor_code;

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
                                    actor: actor_code,
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
   
            const code = config.actor_code;
            const actor_code = config.actor_code;
            // const privtKey = config.led_priv;
            const accountId = config.actor_code;
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
                                    actor: actor_code,
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
            let result;
            try {
                result = trx['processed'].action_traces[0].console;
                const jsonArray = JSON.parse(result);
                const output = jsonArray.map(item => {
                    const photosArray = item.photos.split(',');
                    return {
                        ...item,
                        photos: photosArray
                    };
                });

                return output;
                
            } catch(error) {
                return result;
            }

            // const input  = JSON.parse(result);
            // const photosArray = JSON.parse(result).photos.split(',');

            // const output = {
            //     ...input,
            //     photos: photosArray
            // }

        } catch (error) {
            console.log("selectBnoInfoTrx error : ", error.message);
            // throw new TransactionExecuteException(error);
            throw new Error("There is no data you searched for in the table.");
            // return "FAIL[There is no data you searched for in the table.]";
        }
    }

    convertToUpperCase(input: string): string {
        let result = '';
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            // Check if the character is a lowercase letter
            if (char >= 'a' && char <= 'z') {
                // Convert the lowercase letter to uppercase using ASCII code manipulation
                result += String.fromCharCode(char.charCodeAt(0) - 32);
            } else {
                // If the character is not a lowercase letter, keep it unchanged
                result += char;
            }
        }
        return result;
    }



    // 2024/09/10 라이트브러더스 탄소중립 포인트


    async registerWrbtsInf(bnoinfo: IRegisterWrbtsInfActionInput): Promise<any> {
        const inputParams = {
            bnoinfo: bnoinfo
        }

        try {
            return await this.registerWrbtsInfFunc(bnoinfo);
        } catch(error) {
            console.log("SaaS registerWrbtsInf error : ", error);
            throw new Error(error);
        }
    }  

    async registerWrbtsInfFunc (arg: IRegisterWrbtsInfActionInput): Promise<any> {
        try {
            // const { bnoinfo } = arg;

            const code = config.actor_code;
            const actor_code = config.actor_code;
            // const privtKey = config.led_priv;
            const accountId = config.actor_code;

            if(arg.transport!='01' && arg.transport!='02' && arg.transport!='03'
                && arg.transport!='04' && arg.transport!='05' && arg.transport!='06'
            ) {
                throw new Error("This is a transport code error. (01. WALK 02. BIKE 03. CAR 04. BUS 05. SUBWAY 06. ETC)");
            }

            this.api.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            const bid = uuidv4();
            const regidt = this.getCurrentDateTime();

            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            // console.log("eos.api.transact start : ", privtKey);
            const trx = await this.api.transact(
                {
                    actions: [
                        {
                            account: code,
                            name: "regbnoinfo",
                            authorization: [
                                {
                                    actor: actor_code,
                                    permission: "active",
                                },
                            ],
                            data: {
                                accountId,
                                did: arg.did,
                                bno: bs58.encode(Buffer.from(uuidv4())),
                                transport: arg.transport,
                                stime: arg.stime,
                                etime: arg.etime,
                                distance: arg.distance
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );

            const sresult = trx['processed'].action_traces[0].console;
            console.log("registerWrbtsInfFunc regbnoinfo trx : ", sresult);

            const result = {
                "message": sresult,
                "context": "BlockchainService/registerWrbtsInfFunc"
            }
            // const result = {
            //     trxId : this.convertToUpperCase(trx['processed'].id), //.action_traces[0].console;
            //     bid : bid //.action_traces[0].console;
            // }
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async selectWrbtsInf(bnoinfo: ISelectWrbtsInfActionInput): Promise<any> {
        try {
            return await this.selectWrbtsInfFunc(bnoinfo);
        } catch(error) {
            console.log("SaaS selectWrbtsInf error : ", error);
            throw new Error(error);
        }
    }
    
    async selectWrbtsInfFunc(arg: ISelectWrbtsInfActionInput): Promise<any> {
        try {
            const code = config.actor_code;
            const actor_code = config.actor_code;
            // const privtKey = config.led_priv;
            const accountId = config.actor_code;
            // const eos = new BlockchainService();
            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            this.api.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            console.log("selectWrbtsInfFunc arg :::::: ", arg);

            const trx = await this.api.transact(
                {
                    actions: [
                        {
                            account: code,
                            name: "selbnoinfo",
                            authorization: [
                                {
                                    actor: actor_code,
                                    permission: "active",
                                },
                            ],
                            data: {
                                accountId,
                                did: arg.did,
                                bno: "",
                                transport: arg.transport,
                                stime: arg.stime,
                                etime: arg.etime,
                                distance: arg.distance
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
            let result;
            try {
                result = trx['processed'].action_traces[0].console;
                console.log("selectWrbtsInfFunc result : ", result);
                const jsonArray = JSON.parse(result);
                // const output = jsonArray.map(item => {
                //     const photosArray = item.photos.split(',');
                //     return {
                //         ...item,
                //         photos: photosArray
                //     };
                // });

                return jsonArray;
                
            } catch(error) {
                const eresult = {
                    "message": result,
                    "context": "BlockchainService/selectWrbtsInfFunc"
                }
                return eresult;
            }

            // const input  = JSON.parse(result);
            // const photosArray = JSON.parse(result).photos.split(',');

            // const output = {
            //     ...input,
            //     photos: photosArray
            // }

        } catch (error) {
            console.log("selectWrbtsInfFunc error : ", error.message);
            // throw new TransactionExecuteException(error);
            throw new Error("There is no data you searched for in the table.");
            // return "FAIL[There is no data you searched for in the table.]";
        }
    }    

}
