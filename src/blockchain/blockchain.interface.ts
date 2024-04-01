export interface IBlockchainService {
    registerBnoInfoTrx(bnoinfo: JSON): Promise<any>;
    selectBnoInfoTrx(bno: string): Promise<any>;
}

export interface IRegisterBnoInfoActionInput {
    bnoinfo: JSON;
}

export interface ISelectBnoInfoActionInput {
    bno: string; 
}