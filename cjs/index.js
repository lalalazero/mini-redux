"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Create = __importStar(require("./create"));
var CreateSimple = __importStar(require("./mini/createSimple"));
exports.Store = Create;
exports.StoreSimple = CreateSimple;
var Provider_1 = require("./Provider");
exports.Provider = Provider_1.default;
var connect_1 = require("./connect");
exports.connect = connect_1.default;
