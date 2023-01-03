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
exports.CustomerService = void 0;
class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    findOneBy(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customerRepository.findOneBy(Object.assign({}, input));
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customerRepository.find();
        });
    }
    add(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = this.customerRepository.create(customer);
            return this.customerRepository.save(newCustomer);
        });
    }
    modify(customerId, customerUpdateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const targetCustomer = yield this.customerRepository.save(Object.assign({ id: customerId }, customerUpdateDto));
            return targetCustomer;
        });
    }
}
exports.CustomerService = CustomerService;
