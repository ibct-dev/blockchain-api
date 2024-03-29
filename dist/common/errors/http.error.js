"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKeysException = exports.RestoreHdKeyException = exports.ExtractEccKeyPairException = exports.CreateDidPrivateException = exports.GenerateKeysException = exports.ControllerAccountException = exports.PrivateKeyEllipticException = exports.RpcCallException = exports.CreateTrxDataException = exports.TransactionExecuteException = exports.InvalidAccountType = exports.FailedCreatedNewAccountTrxData = exports.ValidationException = exports.PayloadTooLargeException = exports.NotImplementedException = exports.UnauthorizedException = exports.RequestTimeoutException = exports.MethodNotAllowedException = exports.ConflictException = exports.ForbiddenException = exports.UnsupportedMediaTypeException = exports.BadRequestException = exports.NotFoundException = void 0;
const common_1 = require("@nestjs/common");
class NotFoundException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
class UnsupportedMediaTypeException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
}
exports.UnsupportedMediaTypeException = UnsupportedMediaTypeException;
class ForbiddenException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class ConflictException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
class MethodNotAllowedException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.METHOD_NOT_ALLOWED);
    }
}
exports.MethodNotAllowedException = MethodNotAllowedException;
class RequestTimeoutException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.REQUEST_TIMEOUT);
    }
}
exports.RequestTimeoutException = RequestTimeoutException;
class UnauthorizedException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class NotImplementedException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.NOT_IMPLEMENTED);
    }
}
exports.NotImplementedException = NotImplementedException;
class PayloadTooLargeException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.PAYLOAD_TOO_LARGE);
    }
}
exports.PayloadTooLargeException = PayloadTooLargeException;
class ValidationException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.ValidationException = ValidationException;
class FailedCreatedNewAccountTrxData extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.FailedCreatedNewAccountTrxData = FailedCreatedNewAccountTrxData;
class InvalidAccountType extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidAccountType = InvalidAccountType;
class TransactionExecuteException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.TransactionExecuteException = TransactionExecuteException;
class CreateTrxDataException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.CreateTrxDataException = CreateTrxDataException;
class RpcCallException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.RpcCallException = RpcCallException;
class PrivateKeyEllipticException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.PrivateKeyEllipticException = PrivateKeyEllipticException;
class ControllerAccountException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.ControllerAccountException = ControllerAccountException;
class GenerateKeysException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.GenerateKeysException = GenerateKeysException;
class CreateDidPrivateException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.CreateDidPrivateException = CreateDidPrivateException;
class ExtractEccKeyPairException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.ExtractEccKeyPairException = ExtractEccKeyPairException;
class RestoreHdKeyException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.RestoreHdKeyException = RestoreHdKeyException;
class CreateKeysException extends common_1.HttpException {
    constructor(message, properties) {
        super(Object.assign({ message }, properties), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.CreateKeysException = CreateKeysException;
//# sourceMappingURL=http.error.js.map