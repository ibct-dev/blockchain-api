import { Api, JsonRpc } from "eosjs";
import { IBlockchainService, IRegisterTraninfoActionInput, ISelectTraninfoActionInput } from "./blockchain.interface";
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
    registerTraninfoTrx(vin: string, did: string, traninfo: string): Promise<any>;
    selectTraninfoTrx(vin: string): Promise<any>;
    sha256(input: string): string;
    registerTraninfoTrxFunc(arg: IRegisterTraninfoActionInput): Promise<any>;
    selectTraninfoTrxFunc(arg: ISelectTraninfoActionInput): Promise<any>;
}
