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
            const rslt = await this._blockchainService.registerBnoInfoTrx(body);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/registerBnoInfoTrx"
            });
        }
    }

    @Post("updateBnoInfoTrx")
    async updateBnoInfoTrx(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.updateBnoInfoTrx(body);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/updateBnoInfoTrx"
            });
        }
    }

    @Post("deleteBnoInfoTrx")
    async deleteBnoInfoTrx(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.deleteBnoInfoTrx(body);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/deleteBnoInfoTrx"
            });
        }
    }

    @Post("selectBnoInfoTrx")
    async selectBnoInfoTrx(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.selectBnoInfoTrx(body);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/selectBnoInfoTrx"
            });
        }
    }

    // 2024/09/10 라이트브러더스 탄소중립 포인트 정보 등록
    @Post("registerWrbtsInf")
    async registerWrbtsInf(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.registerWrbtsInf(body);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/registerWrbtsInf"
            });
        }
    }   

    // 2024/09/10 라이트브러더스 탄소중립 포인트 정보 조회
    @Post("selectWrbtsInf")
    async selectWrbtsInf(@Body() body: any): Promise<any> {
        try {
            const rslt = await this._blockchainService.selectWrbtsInf(body);

            return rslt;
        } catch (error: any) {
            throw new BadRequestException(error.message, {
                context:"BlockchainController/selectBnoInfoTrx"
            });
        }
    }
    

}
