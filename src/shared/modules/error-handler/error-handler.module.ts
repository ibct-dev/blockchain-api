import { Module, Global } from "@nestjs/common";
import { ErrorHandlerService } from "./error-handler.service";

@Global()
@Module({
    providers: [
        {
            provide: "ErrorHandlerService",
            useClass: ErrorHandlerService,
        },
    ],
    exports: ["ErrorHandlerService"],
})
export class ErrorHandlerModule {}
