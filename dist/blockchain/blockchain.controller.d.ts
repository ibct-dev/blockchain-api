import { IBlockchainService } from "./blockchain.interface";
export declare class BlockchainControllerPing {
    gethello(): string;
}
export declare class BlockchainController {
    private readonly _blockchainService;
    constructor(_blockchainService: IBlockchainService);
    registerTraninfoTrx(body: any): Promise<any>;
    selectTraninfoTrx(body: any): Promise<any>;
}
