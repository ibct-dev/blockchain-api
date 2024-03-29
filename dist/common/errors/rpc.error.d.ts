import { RpcException } from "@nestjs/microservices";
import { IExceptionProps } from "./property.error";
export declare enum GrpcExceptionStatus {
    OK = 0,
    CANCELLED = 1,
    UNKNOWN = 2,
    INVALID_ARGUMENT = 3,
    DEADLINE_EXCEEDED = 4,
    NOT_FOUND = 5,
    ALREADY_EXISTS = 6,
    PERMISSION_DENIED = 7,
    RESOURCE_EXHAUSTED = 8,
    FAILED_PRECONDITION = 9,
    ABORTED = 10,
    OUT_OF_RANGE = 11,
    UNIMPLEMENTED = 12,
    INTERNAL = 13,
    UNAVAILABLE = 14,
    DATA_LOSS = 15,
    UNAUTHENTICATED = 16
}
export declare class CancelledRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class UnknownRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class InvalidArgumentRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class DeadlineExceededRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class NotFoundRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class AlreadyExistseRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class PermissionDeniedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class ResourceExhaustedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class FailedPreconditionRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class AbortedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class OutOfRangeRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class UnimplementedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class InternalRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class UnavailableRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class DataLossRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
export declare class UnauthenticatedRpcException extends RpcException {
    constructor(message: string, properties?: IExceptionProps);
}
