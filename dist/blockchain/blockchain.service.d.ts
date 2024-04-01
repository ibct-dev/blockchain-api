import { Api, JsonRpc } from "eosjs";
import { IBlockchainService, IRegisterBnoInfoActionInput, ISelectBnoInfoActionInput } from "./blockchain.interface";
import { ErrorHandlerService } from "@shared/modules/error-handler/error-handler.service";
export declare class BlockchainService implements IBlockchainService {
    private readonly _errorService;
    readonly endpoint: string;
    readonly didendpoint: string;
    readonly rpc: JsonRpc;
    readonly didrpc: JsonRpc;
    readonly code: string;
    readonly creator: string;
    readonly account: string;
    api: Api;
    didapi: Api;
    constructor(_errorService: ErrorHandlerService);
    gethello(): string;
    registerBnoInfoTrx(bnoinfo: JSON): Promise<any>;
    selectBnoInfoTrx(bno: string): Promise<any>;
    sha256(input: string): string;
    registerBnoInfoTrxFunc(arg: IRegisterBnoInfoActionInput): Promise<any>;
    selectBnoInfoTrxFunc(arg: ISelectBnoInfoActionInput): Promise<any>;
}
