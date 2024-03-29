import { Injectable } from "@nestjs/common";
import {
    CancelledRpcException,
    UnknownRpcException,
    InvalidArgumentRpcException,
    DeadlineExceededRpcException,
    NotFoundRpcException,
    AlreadyExistseRpcException,
    PermissionDeniedRpcException,
    ResourceExhaustedRpcException,
    FailedPreconditionRpcException,
    AbortedRpcException,
    OutOfRangeRpcException,
    UnimplementedRpcException,
    InternalRpcException,
    UnavailableRpcException,
    DataLossRpcException,
    UnauthenticatedRpcException,
} from "@src/common/errors/rpc.error";
import { AsyncLocalStorageService } from "@shared/modules/async-local-storage/async-local-storage.service";

@Injectable()
export class ErrorHandlerService {
    constructor(private readonly asyncLocalStorage: AsyncLocalStorageService) {}

    public throwCancelledRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new CancelledRpcException(message, { requestId, context });
    }
    public throwUnknownRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new UnknownRpcException(message, { requestId, context });
    }
    public throwInvalidArgumentRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new InvalidArgumentRpcException(message, { requestId, context });
    }
    public throwDeadlineExceededRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new DeadlineExceededRpcException(message, { requestId, context });
    }
    public throwNotFoundRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new NotFoundRpcException(message, { requestId, context });
    }
    public throwAlreadyExistseRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new AlreadyExistseRpcException(message, { requestId, context });
    }
    public throwPermissionDeniedRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new PermissionDeniedRpcException(message, { requestId, context });
    }
    public throwResourceExhaustedRpcException(
        message: string,
        context: string
    ) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new ResourceExhaustedRpcException(message, {
            requestId,
            context,
        });
    }
    public throwFailedPreconditionRpcException(
        message: string,
        context: string
    ) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new FailedPreconditionRpcException(message, {
            requestId,
            context,
        });
    }
    public throwAbortedRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new AbortedRpcException(message, { requestId, context });
    }
    public throwOutOfRangeRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new OutOfRangeRpcException(message, { requestId, context });
    }
    public throwUnimplementedRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new UnimplementedRpcException(message, { requestId, context });
    }
    public throwInternalRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new InternalRpcException(message, { requestId, context });
    }
    public throwUnavailableRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new UnavailableRpcException(message, { requestId, context });
    }
    public throwDataLossRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new DataLossRpcException(message, { requestId, context });
    }
    public throwUnauthenticatedRpcException(message: string, context: string) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new UnauthenticatedRpcException(message, { requestId, context });
    }
}
