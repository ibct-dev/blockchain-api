"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedRpcException = exports.DataLossRpcException = exports.UnavailableRpcException = exports.InternalRpcException = exports.UnimplementedRpcException = exports.OutOfRangeRpcException = exports.AbortedRpcException = exports.FailedPreconditionRpcException = exports.ResourceExhaustedRpcException = exports.PermissionDeniedRpcException = exports.AlreadyExistseRpcException = exports.NotFoundRpcException = exports.DeadlineExceededRpcException = exports.InvalidArgumentRpcException = exports.UnknownRpcException = exports.CancelledRpcException = exports.GrpcExceptionStatus = void 0;
const microservices_1 = require("@nestjs/microservices");
var GrpcExceptionStatus;
(function (GrpcExceptionStatus) {
    GrpcExceptionStatus[GrpcExceptionStatus["OK"] = 0] = "OK";
    GrpcExceptionStatus[GrpcExceptionStatus["CANCELLED"] = 1] = "CANCELLED";
    GrpcExceptionStatus[GrpcExceptionStatus["UNKNOWN"] = 2] = "UNKNOWN";
    GrpcExceptionStatus[GrpcExceptionStatus["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
    GrpcExceptionStatus[GrpcExceptionStatus["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
    GrpcExceptionStatus[GrpcExceptionStatus["NOT_FOUND"] = 5] = "NOT_FOUND";
    GrpcExceptionStatus[GrpcExceptionStatus["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
    GrpcExceptionStatus[GrpcExceptionStatus["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
    GrpcExceptionStatus[GrpcExceptionStatus["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
    GrpcExceptionStatus[GrpcExceptionStatus["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
    GrpcExceptionStatus[GrpcExceptionStatus["ABORTED"] = 10] = "ABORTED";
    GrpcExceptionStatus[GrpcExceptionStatus["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
    GrpcExceptionStatus[GrpcExceptionStatus["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
    GrpcExceptionStatus[GrpcExceptionStatus["INTERNAL"] = 13] = "INTERNAL";
    GrpcExceptionStatus[GrpcExceptionStatus["UNAVAILABLE"] = 14] = "UNAVAILABLE";
    GrpcExceptionStatus[GrpcExceptionStatus["DATA_LOSS"] = 15] = "DATA_LOSS";
    GrpcExceptionStatus[GrpcExceptionStatus["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
})(GrpcExceptionStatus = exports.GrpcExceptionStatus || (exports.GrpcExceptionStatus = {}));
class CancelledRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.CANCELLED }, properties));
    }
}
exports.CancelledRpcException = CancelledRpcException;
class UnknownRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.UNKNOWN }, properties));
    }
}
exports.UnknownRpcException = UnknownRpcException;
class InvalidArgumentRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.INVALID_ARGUMENT }, properties));
    }
}
exports.InvalidArgumentRpcException = InvalidArgumentRpcException;
class DeadlineExceededRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.DEADLINE_EXCEEDED }, properties));
    }
}
exports.DeadlineExceededRpcException = DeadlineExceededRpcException;
class NotFoundRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.NOT_FOUND }, properties));
    }
}
exports.NotFoundRpcException = NotFoundRpcException;
class AlreadyExistseRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.ALREADY_EXISTS }, properties));
    }
}
exports.AlreadyExistseRpcException = AlreadyExistseRpcException;
class PermissionDeniedRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.PERMISSION_DENIED }, properties));
    }
}
exports.PermissionDeniedRpcException = PermissionDeniedRpcException;
class ResourceExhaustedRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.RESOURCE_EXHAUSTED }, properties));
    }
}
exports.ResourceExhaustedRpcException = ResourceExhaustedRpcException;
class FailedPreconditionRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.FAILED_PRECONDITION }, properties));
    }
}
exports.FailedPreconditionRpcException = FailedPreconditionRpcException;
class AbortedRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.ABORTED }, properties));
    }
}
exports.AbortedRpcException = AbortedRpcException;
class OutOfRangeRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.OUT_OF_RANGE }, properties));
    }
}
exports.OutOfRangeRpcException = OutOfRangeRpcException;
class UnimplementedRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.UNIMPLEMENTED }, properties));
    }
}
exports.UnimplementedRpcException = UnimplementedRpcException;
class InternalRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.INTERNAL }, properties));
    }
}
exports.InternalRpcException = InternalRpcException;
class UnavailableRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.UNAVAILABLE }, properties));
    }
}
exports.UnavailableRpcException = UnavailableRpcException;
class DataLossRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.DATA_LOSS }, properties));
    }
}
exports.DataLossRpcException = DataLossRpcException;
class UnauthenticatedRpcException extends microservices_1.RpcException {
    constructor(message, properties) {
        super(Object.assign({ message, code: GrpcExceptionStatus.UNAUTHENTICATED }, properties));
    }
}
exports.UnauthenticatedRpcException = UnauthenticatedRpcException;
//# sourceMappingURL=rpc.error.js.map