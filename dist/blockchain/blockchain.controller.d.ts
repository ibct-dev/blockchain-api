import { IBlockchainService } from "./blockchain.interface";
export declare class BlockchainControllerPing {
    gethello(): string;
}
export declare class BlockchainController {
    private readonly _blockchainService;
    constructor(_blockchainService: IBlockchainService);
    registerBnoInfoTrx(body: any): Promise<any>;
    selectBnoInfoTrx(body: any): Promise<any>;
}
