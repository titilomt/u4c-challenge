"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const controller_1 = require("./controller");
const db_1 = require("../../main/db");
exports.default = (server) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, db_1.getConnection)();
    const customerController = new controller_1.CustomerController(conn);
    server.bind(customerController);
    server.route({
        method: "GET",
        path: "/customers",
        options: {
            handler: customerController.findAll,
            tags: ["api", "customers"],
            description: "List all customers.",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "List Customers.",
                        },
                        "404": {
                            description: "Customers does not exists.",
                        },
                    },
                },
            },
        },
    });
    server.route({
        method: "PUT",
        path: "/customers/{id}",
        options: {
            handler: customerController.updateCustomer,
            tags: ["api", "customers"],
            description: "Update Customer by id.",
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().required(),
                }),
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "204": {
                            description: "Updated Customer.",
                        },
                        "404": {
                            description: "Customer does not exists.",
                        },
                    },
                },
            },
        },
    });
    server.route({
        method: "POST",
        path: "/customers",
        options: {
            handler: customerController.create,
            tags: ["api", "customers"],
            description: "Create a Customer.",
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "201": {
                            description: "Created Customer.",
                        },
                    },
                },
            },
        },
    });
});
