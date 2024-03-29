import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.NOT_FOUND);
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.BAD_REQUEST);
    }
}

export class UnsupportedMediaTypeException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.FORBIDDEN);
    }
}

export class ConflictException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.CONFLICT);
    }
}

export class MethodNotAllowedException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.METHOD_NOT_ALLOWED);
    }
}

export class RequestTimeoutException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.REQUEST_TIMEOUT);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.UNAUTHORIZED);
    }
}

export class NotImplementedException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.NOT_IMPLEMENTED);
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.PAYLOAD_TOO_LARGE);
    }
}

export class ValidationException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

// newAccount Exception
export class FailedCreatedNewAccountTrxData extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class InvalidAccountType extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.BAD_REQUEST);
    }
}

export class TransactionExecuteException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
export class CreateTrxDataException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class RpcCallException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class PrivateKeyEllipticException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class ControllerAccountException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
export class GenerateKeysException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
export class CreateDidPrivateException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
export class ExtractEccKeyPairException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
export class RestoreHdKeyException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
export class CreateKeysException extends HttpException {
    constructor(message: string, properties?: { [key: string]: any }) {
        super({ message, ...properties }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
