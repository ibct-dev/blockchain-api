export interface IBlockchainService {
    registerBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any>;
    updateBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any>;
    deleteBnoInfoTrx(bnoinfo: IDeleteBnoInfoActionInput): Promise<any>;
    selectBnoInfoTrx(bno: ISelectBnoInfoActionInput): Promise<any>;
}

export interface IRegisterBnoInfoActionInput {
    bno: string;
    title: string;
    model: string;
    year: string;
    brand: string;
    frame: string;
    photos: JSON;
    bid: string;
}

export interface ISelectBnoInfoActionInput {
    bno: string; 
    title: string;
    model: string;
    year: string;
    brand: string;
    frame: string;
    bid: string;
}

export interface IDeleteBnoInfoActionInput {
    bno: string; 
}