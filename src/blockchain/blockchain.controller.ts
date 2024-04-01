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

    @Post("registerBnoInfoTrx")
    async registerBnoInfoTrx(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.registerBnoInfoTrx(body.bnoinfo);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/registerBnoInfoTrx"
            });
        }
    }

    @Post("selectBnoInfoTrx")
    async selectBnoInfoTrx(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.selectBnoInfoTrx(body.bno);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/selectBnoInfoTrx"
            });
        }
    }

    

}
