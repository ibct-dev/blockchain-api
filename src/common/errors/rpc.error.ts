import { RpcException } from "@nestjs/microservices";
import { IExceptionProps } from "./property.error";

export enum GrpcExceptionStatus {
    // ref => https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
    OK,
    CANCELLED,
    UNKNOWN,
    INVALID_ARGUMENT,
    DEADLINE_EXCEEDED,
    NOT_FOUND,
    ALREADY_EXISTS,
    PERMISSION_DENIED,
    RESOURCE_EXHAUSTED,
    FAILED_PRECONDITION,
    ABORTED,
    OUT_OF_RANGE,
    UNIMPLEMENTED,
    INTERNAL,
    UNAVAILABLE,
    DATA_LOSS,
    UNAUTHENTICATED,
}

export class CancelledRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.CANCELLED,
            ...properties,
        });
    }
}

export class UnknownRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.UNKNOWN,
            ...properties,
        });
    }
}

export class InvalidArgumentRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.INVALID_ARGUMENT,
            ...properties,
        });
    }
}

export class DeadlineExceededRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.DEADLINE_EXCEEDED,
            ...properties,
        });
    }
}

export class NotFoundRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.NOT_FOUND,
            ...properties,
        });
    }
}

export class AlreadyExistseRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.ALREADY_EXISTS,
            ...properties,
        });
    }
}

export class PermissionDeniedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.PERMISSION_DENIED,
            ...properties,
        });
    }
}

export class ResourceExhaustedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.RESOURCE_EXHAUSTED,
            ...properties,
        });
    }
}

export class FailedPreconditionRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.FAILED_PRECONDITION,
            ...properties,
        });
    }
}

export class AbortedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.ABORTED,
            ...properties,
        });
    }
}
export class OutOfRangeRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.OUT_OF_RANGE,
            ...properties,
        });
    }
}

export class UnimplementedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.UNIMPLEMENTED,
            ...properties,
        });
    }
}

export class InternalRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.INTERNAL,
            ...properties,
        });
    }
}

export class UnavailableRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.UNAVAILABLE,
            ...properties,
        });
    }
}

export class DataLossRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.DATA_LOSS,
            ...properties,
        });
    }
}

export class UnauthenticatedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps) {
        super({
            message,
            code: GrpcExceptionStatus.UNAUTHENTICATED,
            ...properties,
        });
    }
}
