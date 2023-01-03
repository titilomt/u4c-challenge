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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const service_1 = require("./service");
const customers_entity_1 = require("../../infra/db/entities/customers/customers.entity");
class CustomerController {
    constructor(connection) {
        this.customerService = new service_1.CustomerService(connection.getRepository(customers_entity_1.Customers));
    }
    findAll(_request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield this.customerService.findAll();
                return h.response(customers).code(200);
            }
            catch (err) {
                const error = err;
                return h.response(error.message).code(500);
            }
        });
    }
    create(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const createCustomerDto = (request.payload);
            try {
                const customer = yield this.customerService.add(createCustomerDto);
                return h.response(customer).code(201);
            }
            catch (err) {
                const error = err;
                return h.response(error.message).code(500);
            }
        });
    }
    updateCustomer(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = request.params["id"];
            const customerUpdateDto = (request.payload);
            try {
                yield this.customerService.modify(parseInt(id), customerUpdateDto);
                return h.response().code(204);
            }
            catch (err) { }
        });
    }
}
exports.CustomerController = CustomerController;
