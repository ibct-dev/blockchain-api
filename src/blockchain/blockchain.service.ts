/* eslint-disable security/detect-object-injection */
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

    async registerBnoInfoTrx(bnoinfo: JSON): Promise<any> {
        const inputParams = {
            bnoinfo: bnoinfo
        }

        try {
            const bno = JSON.parse(JSON.stringify(bnoinfo)).bno;
            const chk = await this.selectBnoInfoTrx(bno);
            if(JSON.stringify(chk).indexOf("FAIL") == -1) {
                throw new Error("Data already exists in table");    
            }
        } catch(error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }

        try {
            return await this.registerBnoInfoTrxFunc(inputParams);
        } catch(error) {
            console.log("SaaS registerTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }

    async selectBnoInfoTrx(bno: string): Promise<any> {
        const inputParams = {
            bno: bno
        }

        try {
            return await this.selectBnoInfoTrxFunc(inputParams);
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
            const { bnoinfo } = arg;

            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;

            console.log("accountId : ", accountId);
            console.log("code : ", code);
            const bno = JSON.parse(JSON.stringify(bnoinfo)).bno;
            console.log("bno : ", bno);
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
                            name: "regbnoinfo",
                            authorization: [
                                {
                                    actor: code,
                                    permission: "active",
                                },
                            ],
                            data: {
                                accountId,
                                bno,
                                bnoinfo: JSON.stringify(bnoinfo)
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
            const { bno } = arg;
   
            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;
            // const eos = new BlockchainService();
            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            this.didapi.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            console.log("selectBnoInfoTrx start :::::: ", bno);
            console.log("selectBnoInfoTrx accountId :::::: ", accountId);

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
                                bno
                            },
                        },
                    ],
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );

            console.log("selectBnoInfoTrx result trx : ", trx);
            console.log("selectBnoInfoTrx result trx['processed'].action_traces : ", trx['processed'].action_traces);

            const result = trx['processed'].action_traces[0].console;

            try {
                return JSON.parse(result);
            } catch(error) {
                return result;
            }
        } catch (error) {
            console.log("selectBnoInfoTrx error : ", error.message);
            throw new TransactionExecuteException(error);
        }
    }


}
