"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerModel = exports.createCustomerModel = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCustomerModel = joi_1.default.object({
    document: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    driverLicense: joi_1.default.string().required(),
    birth: joi_1.default.date(),
    phone: joi_1.default.string().required(),
    vehicules: joi_1.default.array()
        .min(1)
        .items(joi_1.default.object({
        name: joi_1.default.string().required(),
        year: joi_1.default.string().required(),
        plate: joi_1.default.string().required(),
        brand: joi_1.default.string().required(),
        chassis: joi_1.default.string().required(),
    }))
        .required(),
});
exports.updateCustomerModel = joi_1.default.object({
    document: joi_1.default.string(),
    name: joi_1.default.string(),
    driverLicense: joi_1.default.string(),
    birth: joi_1.default.date(),
    phone: joi_1.default.string(),
    vehicules: joi_1.default.array()
        .min(0)
        .items(joi_1.default.object({
        name: joi_1.default.string().required(),
        year: joi_1.default.string().required(),
        plate: joi_1.default.string().required(),
        brand: joi_1.default.string().required(),
        chassis: joi_1.default.string().required(),
    })),
});
