import { HttpException } from "@nestjs/common";
export declare class NotFoundException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class BadRequestException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class UnsupportedMediaTypeException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class ForbiddenException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class ConflictException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class MethodNotAllowedException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class RequestTimeoutException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class UnauthorizedException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class NotImplementedException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class PayloadTooLargeException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class ValidationException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class FailedCreatedNewAccountTrxData extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class InvalidAccountType extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class TransactionExecuteException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class CreateTrxDataException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class RpcCallException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class PrivateKeyEllipticException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class ControllerAccountException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class GenerateKeysException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class CreateDidPrivateException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class ExtractEccKeyPairException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class RestoreHdKeyException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
export declare class CreateKeysException extends HttpException {
    constructor(message: string, properties?: {
        [key: string]: any;
    });
}
