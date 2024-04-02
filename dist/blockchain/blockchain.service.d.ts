import { Api, JsonRpc } from "eosjs";
import { IBlockchainService, IRegisterBnoInfoActionInput, IDeleteBnoInfoActionInput, ISelectBnoInfoActionInput } from "./blockchain.interface";
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
    registerBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any>;
    updateBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any>;
    deleteBnoInfoTrx(bnoinfo: IDeleteBnoInfoActionInput): Promise<any>;
    selectBnoInfoTrx(bnoinfo: ISelectBnoInfoActionInput): Promise<any>;
    sha256(input: string): string;
    registerBnoInfoTrxFunc(arg: IRegisterBnoInfoActionInput): Promise<any>;
    updateBnoInfoTrxFunc(arg: IRegisterBnoInfoActionInput): Promise<any>;
    deleteBnoInfoTrxFunc(arg: IDeleteBnoInfoActionInput): Promise<any>;
    selectBnoInfoTrxFunc(arg: ISelectBnoInfoActionInput): Promise<any>;
}
