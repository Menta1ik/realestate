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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesController = void 0;
const common_1 = require("@nestjs/common");
const properties_service_1 = require("./properties.service");
const create_property_dto_1 = require("./dto/create-property.dto");
const update_property_dto_1 = require("./dto/update-property.dto");
let PropertiesController = class PropertiesController {
    propertiesService;
    constructor(propertiesService) {
        this.propertiesService = propertiesService;
    }
    create(createPropertyDto) {
        return this.propertiesService.create(createPropertyDto);
    }
    async findAll(search, status, type, minPrice, maxPrice, bedrooms, sort, res) {
        const where = {
            AND: [],
        };
        const and = where.AND;
        if (search) {
            and.push({
                OR: [
                    { nameEn: { contains: search } },
                    { nameRu: { contains: search } },
                    { developer: { contains: search } },
                    { ref: { contains: search } },
                ],
            });
        }
        if (status && status !== 'all') {
            and.push({ status: { equals: status } });
        }
        if (type) {
            and.push({ type: { equals: type } });
        }
        if (minPrice) {
            and.push({ priceFromAED: { gte: Number(minPrice) } });
        }
        if (maxPrice) {
            and.push({ priceFromAED: { lte: Number(maxPrice) } });
        }
        if (bedrooms) {
            // "bedrooms" in DB is string "1, 2, 3".
            if (bedrooms === 'studio') {
                and.push({ bedrooms: { contains: 'Studio' } });
            }
            else if (bedrooms === '4+') {
                and.push({
                    OR: [
                        { bedrooms: { contains: '4' } },
                        { bedrooms: { contains: '5' } },
                        { bedrooms: { contains: '6' } },
                        { bedrooms: { contains: '7' } },
                    ]
                });
            }
            else {
                and.push({ bedrooms: { contains: bedrooms } });
            }
        }
        const orderBy = {};
        if (sort === 'price_asc') {
            orderBy.priceFromAED = 'asc';
        }
        else if (sort === 'price_desc') {
            orderBy.priceFromAED = 'desc';
        }
        else {
            orderBy.createdAt = 'desc'; // Default
        }
        const properties = await this.propertiesService.findAll({
            where,
            orderBy,
        });
        res.set('Content-Range', `properties 0-${properties.length}/${properties.length}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        return res.json(properties);
    }
    findOne(id) {
        return this.propertiesService.findOne(id);
    }
    update(id, updatePropertyDto) {
        return this.propertiesService.update(id, updatePropertyDto);
    }
    remove(id) {
        return this.propertiesService.remove(id);
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('type')),
    __param(3, (0, common_1.Query)('minPrice')),
    __param(4, (0, common_1.Query)('maxPrice')),
    __param(5, (0, common_1.Query)('bedrooms')),
    __param(6, (0, common_1.Query)('sort')),
    __param(7, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_dto_1.UpdatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "remove", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, common_1.Controller)('properties'),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map