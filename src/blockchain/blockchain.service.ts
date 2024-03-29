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
    IRegisterTraninfoActionInput,
    ISelectTraninfoActionInput
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

    async registerTraninfoTrx(vin: string, did: string, traninfo: string): Promise<any> {
        const inputParams = {
            vin: vin,
            did: did,
            traninfo: traninfo
        }

        try {
            return await this.registerTraninfoTrxFunc(inputParams);
        } catch(error) {
            console.log("SaaS registerTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }

    async selectTraninfoTrx(vin: string): Promise<any> {
        const inputParams = {
            vin: vin
        }

        try {
            return await this.selectTraninfoTrxFunc(inputParams);
        } catch(error) {
            console.log("SaaS selectTraninfoTrx error : ", error);
            throw new Error(error);
        }
    }



        
    sha256(input: string): string {
        return crypto.createHash('sha256').update(input).digest('hex');
    }

    async registerTraninfoTrxFunc (arg: IRegisterTraninfoActionInput): Promise<any> {
        try {
            const { vin, did, traninfo } = arg;

            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;

            console.log("accountId : ", accountId);
            console.log("code : ", code);
            console.log("vin : ", vin);
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
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );
            const result = trx['processed'].action_traces[0].console;
            return result;
        } catch (error) {
            throw new TransactionExecuteException(error);
        }
    }

    async selectTraninfoTrxFunc(arg: ISelectTraninfoActionInput): Promise<any> {
        try {
            const { vin } = arg;
   
            const code = config.led_lit_code;
            // const privtKey = config.led_priv;
            const accountId = config.led_lit_code;
            // const eos = new BlockchainService();
            // eos.didapi.signatureProvider = new JsSignatureProvider([privtKey]);
            this.didapi.signatureProvider = new JsSignatureProvider(
                (config.led_priv as string).split(" ")
            );

            console.log("selectDidPinTrx start :::::: ", vin);
            console.log("selectDidPinTrx accountId :::::: ", accountId);

            const trx = await this.didapi.transact(
                {
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
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 30,
                }
            );

            console.log("selectTraninfoTrx result trx : ", trx);
            console.log("selectTraninfoTrx result trx['processed'].action_traces : ", trx['processed'].action_traces);

            const result = trx['processed'].action_traces[0].console;
            return result;
        } catch (error) {
            console.log("selectTraninfoTrx error : ", error.message);
            throw new TransactionExecuteException(error);
        }
    }


}
