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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CardController = void 0;
const tsoa_1 = require("tsoa");
const CardService_1 = require("../service/CardService");
let CardController = class CardController extends tsoa_1.Controller {
    constructor(cardservice) {
        super();
        this.cardservice = cardservice;
    }
    CreateCardController(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCard = yield this.cardservice.CreateCardService(requestBody);
                return newCard;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    GetAllCardController() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cardservice.GetAllCardService();
        });
    }
    GetCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const card = yield this.cardservice.GetByIdService(id);
                if (card) {
                    return card;
                }
                else {
                    return { message: "Card Not Found" };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update card
    UpdateCardController(id, UpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatecard = yield this.cardservice.updateCardService(id, UpdateData);
            if (updatecard) {
                return updatecard;
            }
            else {
                this.setStatus(404);
                return { message: "Card Not Found" };
            }
        });
    }
    // delete card by id
    DeleteCardContrioller(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletecard = yield this.cardservice.DeleteCardService(id);
            if (deletecard) {
                return deletecard;
            }
            else {
                return { message: "Card Not Found" };
            }
        });
    }
};
exports.CardController = CardController;
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "CreateCardController", null);
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CardController.prototype, "GetAllCardController", null);
__decorate([
    (0, tsoa_1.Get)("/:id"),
    (0, tsoa_1.SuccessResponse)("200", "Successfully retrieved card"),
    (0, tsoa_1.Response)("404", "Card not found"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "GetCardById", null);
__decorate([
    (0, tsoa_1.Put)("/:id"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "UpdateCardController", null);
__decorate([
    (0, tsoa_1.Delete)("/:id"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardController.prototype, "DeleteCardContrioller", null);
exports.CardController = CardController = __decorate([
    (0, tsoa_1.Route)("Cards"),
    __metadata("design:paramtypes", [CardService_1.CardService])
], CardController);
