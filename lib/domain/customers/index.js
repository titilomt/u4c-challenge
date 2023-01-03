"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const routes_1 = __importDefault(require("./routes"));
function init(server) {
    (0, routes_1.default)(server);
}
exports.init = init;
