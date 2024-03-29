import { BlockchainModule } from "@src/blockchain/blockchain.module";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
// import { LoggerModule } from "@src/shared/infra/logger/logger.module";

// import { LoggingInterceptor } from "@common/interceptors/logging.interceptor";
import { Module } from "@nestjs/common";
import {
    AsyncLocalStorageModule,
    ErrorHandlerModule,
} from "@shared/modules";

@Module({
    imports: [AsyncLocalStorageModule, ErrorHandlerModule, BlockchainModule, ConfigModule.forRoot()
    ],    
    controllers: [],
    providers: [
        // {
        //     provide: APP_INTERCEPTOR,
        //     useClass: LoggingInterceptor,
        // },
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
    ],
})
export class AppModule {}
