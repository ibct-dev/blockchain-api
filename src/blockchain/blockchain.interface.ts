export interface IBlockchainService {
    registerTraninfoTrx(vin: string, did: string, traninfo: string): Promise<any>;
    selectTraninfoTrx(vin: string): Promise<any>;
}

export interface IRegisterTraninfoActionInput {
    vin: string; 
    did: string;
    traninfo: string;
}

export interface ISelectTraninfoActionInput {
    vin: string; 
}