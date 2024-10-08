/* eslint-disable security/detect-object-injection */
import { v4 as uuidv4 } from 'uuid';
import bs58 from "bs58";
import * as crypto from 'crypto';
import * as secp256k1 from 'secp256k1'; // secp256k1 라이브러리 설치 필요
import { createHash } from 'crypto';
import { getTime } from "@src/shared/services/time";
import { Inject, Injectable } from "@nestjs/common";
import { Api, JsonRpc } from "eosjs";
import { config } from "@config";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { TextDecoder, TextEncoder } from "text-encoding";
import { LitResolver } from "./litResolver.service";

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
    async registerWrbtsInf (arg: IRegisterWrbtsInfActionInput): Promise<any> {
        try {
            const code = config.wactor_code;
            const actor_code = config.wactor_code;
            const accountId = config.wactor_code;

            // 비밀키와 공개키 생성 (여기서는 임시 키 생성)
            // const privateKey = Buffer.from('<your-private-key-hex>', 'hex'); // 32바이트 개인키
            // const publicKey = secp256k1.publicKeyCreate(privateKey); // 개인키로 공개키 생성

            // 서명할 메시지
            // const message = 'This is a message';
            // 서명 생성
            // const privateKey = "5oEgECLZ9VCsJedW8Avm65nokqUoUBmNDvaKy6AMmySf";
            // const drvmessage = JSON.stringify(arg.drivingInfo);
            // console.log("drvmessage : ", drvmessage);
            // const signature0 = this.signMessage(drvmessage, bs58.decode(privateKey));
            // //a7644188e1a4c8998065c66796864412e60d34ab9da511c9152f36fc1c792d2033eb5ccbc7e551437f56cef6369c6e81c3760996a7f61c5b95eb8ae1312a520c
            // console.log('Signature:', signature0.toString('hex'));

            const signature = Buffer.from(arg.signedMsg, 'hex');

            const litResolver = new LitResolver(config.resover_endpoint);
            const result = await litResolver.resolve(arg.did);
            const publicKey = bs58.decode(result.didDocument.verificationMethod[0].publicKeyBase58);

            // console.log("registerWrbtsInf resolver : ", JSON.stringify(result.didDocument.verificationMethod[0].publicKeyBase58));

            // 서명 검증
            const message = JSON.stringify(arg.drivingInfo);
            const isValid = this.verifySignature(message, signature, publicKey);
            console.log('Is signature valid?', isValid);

            if(!isValid) {
                const eresult = {
                    "message": "Signature message is not correct.",
                    "context": "BlockchainService/registerWrbtsInf"
                }
                return eresult;
            }

            const transType = arg.drivingInfo.transport;

            if(transType!='01' && transType!='02' && transType!='03'
                && transType!='04' && transType!='05' && transType!='06'
            ) {
                throw new Error("This is a transport code error. (01. WALK 02. BIKE 03. CAR 04. BUS 05. SUBWAY 06. ETC)");
            }

            this.api.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            const maxRetries = 5; // Number of retries
            let attempt = 0;
            
            while (attempt < maxRetries) {
                try {

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
                                        transport: arg.drivingInfo.transport,
                                        stime: arg.drivingInfo.stime,
                                        etime: arg.drivingInfo.etime,
                                        distance: arg.drivingInfo.distance
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
                    console.log("registerWrbtsInf regbnoinfo trx : ", sresult);

                    const result = {
                        "message": [sresult],
                        "context": "BlockchainService/registerWrbtsInf"
                    }
                    // const result = {
                    //     trxId : this.convertToUpperCase(trx['processed'].id), //.action_traces[0].console;
                    //     bid : bid //.action_traces[0].console;
                    // }
                    return result;
                } catch (error) {
                    attempt++;
                    console.log(`registerWrbtsInf error (attempt ${attempt} of ${maxRetries}) : `, error);
    
                    if (attempt >= maxRetries) {
                        throw error; // Re-throw the error if max retries are reached
                    }
    
                    // Optionally, add a delay between retries
                    await new Promise(resolve => setTimeout(resolve, 200));
                } 
            }
        } catch (error) {
            const eresult = {
                "message": error.message,
                "context": "BlockchainService/registerWrbtsInf"
            }
            return eresult;
        }
    }
    
   
    async selectWrbtsInf(arg: ISelectWrbtsInfActionInput): Promise<any> {
        try {
            const code = config.wactor_code;
            const actor_code = config.wactor_code;
            const accountId = config.wactor_code;
            this.api.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            console.log("selectWrbtsInf arg :::::: ", arg);
            const maxRetries = 3; // Number of retries
            let attempt = 0;
            
            while (attempt < maxRetries) {
                try {
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

                    let result;
                    try {
                        result = trx['processed'].action_traces[0].console;
                        console.log("selectWrbtsInf result : ", result);
                        const jsonArray = JSON.parse(result);
        
                        return jsonArray;
                        
                    } catch(error) {
                        const eresult = {
                            "message": result,
                            "context": "BlockchainService/selectWrbtsInf"
                        }
                        return eresult;
                    }                    
                } catch (error) {
                    attempt++;
                    console.log(`selectWrbtsInf error (attempt ${attempt} of ${maxRetries}) : `, error);
    
                    if (attempt >= maxRetries) {
                        throw error; // Re-throw the error if max retries are reached
                    }
    
                    // Optionally, add a delay between retries
                    await new Promise(resolve => setTimeout(resolve, 200));
                }                    
            }

        } catch (error) {
            console.log("selectWrbtsInf error : ", error.message);
            // throw new TransactionExecuteException(error);
            const eresult = {
                "message": error.message,
                "context": "BlockchainService/selectWrbtsInf"
            }
            return eresult;
        }
    }    

    // 메시지를 해싱하는 함수
    hashMessage(message: string): Buffer {
        return createHash('sha256').update(message).digest();
    }

    // ECDSA 서명 생성 (secp256k1)
    signMessage(message: string, privateKey: Buffer): Buffer {
        const msgHash = this.hashMessage(message); // 메시지 해시
        console.log("signMessage msgHash : ", Buffer.from(msgHash));
        console.log("signMessage privateKey : ", Buffer.from(privateKey));
        const signature = secp256k1.ecdsaSign(msgHash, privateKey).signature; // 서명 생성
        return Buffer.from(signature);
    }

    // ECDSA 서명 검증 (secp256k1)
    verifySignature(message: string, signature: Buffer, publicKey: Buffer): boolean {
        const msgHash = this.hashMessage(message); // 메시지 해시
        return secp256k1.ecdsaVerify(signature, msgHash, publicKey); // 서명 검증
    }    

}
