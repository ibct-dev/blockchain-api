export interface IBlockchainService {
    registerBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any>;
    updateBnoInfoTrx(bnoinfo: IRegisterBnoInfoActionInput): Promise<any>;
    deleteBnoInfoTrx(bnoinfo: IDeleteBnoInfoActionInput): Promise<any>;
    selectBnoInfoTrx(bno: ISelectBnoInfoActionInput): Promise<any>;

    registerWrbtsInf(bnoinfo: IRegisterWrbtsInfActionInput): Promise<any>;
    selectWrbtsInf(bno: ISelectWrbtsInfActionInput): Promise<any>;
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
    regidt: string;
}

export interface ISelectBnoInfoActionInput {
    bno: string; 
    title: string;
    model: string;
    year: string;
    brand: string;
    frame: string;
    bid: string;
    regidt: string;
}

export interface IDeleteBnoInfoActionInput {
    bno: string; 
}

export interface IRegisterWrbtsInfActionInput {
    did: string;
    bno: string;
    transport: string;
    stime: string;
    etime: string;
    distance: string;
}

export interface ISelectWrbtsInfActionInput {
    did: string;
    bno: string;
    transport: string;
    stime: string;
    etime: string;
    distance: string;
}