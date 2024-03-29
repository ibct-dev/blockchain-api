import { AsyncLocalStorageService } from "@shared/modules/async-local-storage/async-local-storage.service";
export declare class ErrorHandlerService {
    private readonly asyncLocalStorage;
    constructor(asyncLocalStorage: AsyncLocalStorageService);
    throwCancelledRpcException(message: string, context: string): void;
    throwUnknownRpcException(message: string, context: string): void;
    throwInvalidArgumentRpcException(message: string, context: string): void;
    throwDeadlineExceededRpcException(message: string, context: string): void;
    throwNotFoundRpcException(message: string, context: string): void;
    throwAlreadyExistseRpcException(message: string, context: string): void;
    throwPermissionDeniedRpcException(message: string, context: string): void;
    throwResourceExhaustedRpcException(message: string, context: string): void;
    throwFailedPreconditionRpcException(message: string, context: string): void;
    throwAbortedRpcException(message: string, context: string): void;
    throwOutOfRangeRpcException(message: string, context: string): void;
    throwUnimplementedRpcException(message: string, context: string): void;
    throwInternalRpcException(message: string, context: string): void;
    throwUnavailableRpcException(message: string, context: string): void;
    throwDataLossRpcException(message: string, context: string): void;
    throwUnauthenticatedRpcException(message: string, context: string): void;
}
