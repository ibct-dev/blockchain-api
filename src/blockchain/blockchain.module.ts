import { Module } from "@nestjs/common";
import { BlockchainController, BlockchainControllerPing } from "./blockchain.controller";
import { BlockchainService } from "./blockchain.service";
import { AsyncLocalStorageModule } from "@shared/modules/async-local-storage/async-local-storage.module";
import { ErrorHandlerModule } from "@shared/modules/error-handler/error-handler.module";

@Module({
    imports: [
        AsyncLocalStorageModule,
        ErrorHandlerModule,
        ],
    controllers: [BlockchainController, BlockchainControllerPing],
    providers: [BlockchainService],
})
export class BlockchainModule {}
