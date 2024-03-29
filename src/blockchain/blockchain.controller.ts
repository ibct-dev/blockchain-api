import { Body, Controller, Get, Inject, Post } from "@nestjs/common";

import { IBlockchainService } from "./blockchain.interface";
import { BadRequestException } from "@src/common/errors/http.error";

@Controller("")
export class BlockchainControllerPing {
    @Get("")
    gethello(): string {
        return "";
    }
}

@Controller("SaaS")
export class BlockchainController {
    constructor(
        @Inject("BlockchainService")
        private readonly _blockchainService: IBlockchainService
    ) {}

    @Post("registerTraninfoTrx")
    async registerTraninfoTrx(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.registerTraninfoTrx(body.vin, body.did, body.traninfo);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/registerTraninfoTrx"
            });
        }
    }

    @Post("selectTraninfoTrx")
    async selectTraninfoTrx(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.selectTraninfoTrx(body.vin);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/selectTraninfoTrx"
            });
        }
    }

    

}
