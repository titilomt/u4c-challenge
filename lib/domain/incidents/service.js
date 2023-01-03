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
exports.IncidentService = void 0;
class IncidentService {
    constructor(incidentRepository, customerService, thirdPartyService) {
        this.incidentRepository = incidentRepository;
        this.customerService = customerService;
        this.thirdPartyService = thirdPartyService;
    }
    embedThirdParty(list) {
        return __awaiter(this, void 0, void 0, function* () {
            const listProcessed = [];
            for (const thirdPartyDto of list) {
                const party = yield this.thirdPartyService.findOneBy({
                    document: thirdPartyDto.document,
                });
                if (!party) {
                    const newParty = yield this.thirdPartyService.add(thirdPartyDto);
                    listProcessed.push(newParty);
                }
                else {
                    listProcessed.push(party);
                }
            }
            return listProcessed;
        });
    }
    addIncidentEvent(incidentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let newIncident = this.incidentRepository.create();
            const { address, customerVehiculePlate, customerDocument, date, policeReport, thirdPartyList, } = incidentDto;
            const customer = yield this.customerService.findOneBy({
                document: customerDocument,
            });
            newIncident.address = address;
            newIncident.customerDocument = customerDocument;
            if (customer)
                newIncident.customers = customer;
            newIncident.customerVehiculePlate = customerVehiculePlate;
            newIncident.date = date;
            newIncident.policeReport = policeReport;
            if (thirdPartyList.length) {
                const processedthirdPartyList = yield this.embedThirdParty(thirdPartyList);
                newIncident.thirdParty = processedthirdPartyList;
            }
            return this.incidentRepository.save(newIncident);
        });
    }
}
exports.IncidentService = IncidentService;
