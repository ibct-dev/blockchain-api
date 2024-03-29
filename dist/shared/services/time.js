"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayByInt = exports.getTime = void 0;
const moment_1 = __importDefault(require("moment"));
const getTime = () => moment_1.default.utc().format("YYYY-MM-DDTHH:mm:ss.SSS");
exports.getTime = getTime;
const getTodayByInt = () => parseInt(moment_1.default.utc().format("YYYYMMDD"));
exports.getTodayByInt = getTodayByInt;
//# sourceMappingURL=time.js.map