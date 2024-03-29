"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerService = void 0;
const common_1 = require("@nestjs/common");
const rpc_error_1 = require("../../../common/errors/rpc.error");
const async_local_storage_service_1 = require("../async-local-storage/async-local-storage.service");
let ErrorHandlerService = class ErrorHandlerService {
    constructor(asyncLocalStorage) {
        this.asyncLocalStorage = asyncLocalStorage;
    }
    throwCancelledRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.CancelledRpcException(message, { requestId, context });
    }
    throwUnknownRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.UnknownRpcException(message, { requestId, context });
    }
    throwInvalidArgumentRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.InvalidArgumentRpcException(message, { requestId, context });
    }
    throwDeadlineExceededRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.DeadlineExceededRpcException(message, { requestId, context });
    }
    throwNotFoundRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.NotFoundRpcException(message, { requestId, context });
    }
    throwAlreadyExistseRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.AlreadyExistseRpcException(message, { requestId, context });
    }
    throwPermissionDeniedRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.PermissionDeniedRpcException(message, { requestId, context });
    }
    throwResourceExhaustedRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.ResourceExhaustedRpcException(message, {
            requestId,
            context,
        });
    }
    throwFailedPreconditionRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.FailedPreconditionRpcException(message, {
            requestId,
            context,
        });
    }
    throwAbortedRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.AbortedRpcException(message, { requestId, context });
    }
    throwOutOfRangeRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.OutOfRangeRpcException(message, { requestId, context });
    }
    throwUnimplementedRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.UnimplementedRpcException(message, { requestId, context });
    }
    throwInternalRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.InternalRpcException(message, { requestId, context });
    }
    throwUnavailableRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.UnavailableRpcException(message, { requestId, context });
    }
    throwDataLossRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.DataLossRpcException(message, { requestId, context });
    }
    throwUnauthenticatedRpcException(message, context) {
        const { requestId } = this.asyncLocalStorage.getStore();
        throw new rpc_error_1.UnauthenticatedRpcException(message, { requestId, context });
    }
};
ErrorHandlerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [async_local_storage_service_1.AsyncLocalStorageService])
], ErrorHandlerService);
exports.ErrorHandlerService = ErrorHandlerService;
//# sourceMappingURL=error-handler.service.js.map