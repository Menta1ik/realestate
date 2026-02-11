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
exports.LayoutTypesController = void 0;
const common_1 = require("@nestjs/common");
const layout_types_service_1 = require("./layout-types.service");
const create_layout_type_dto_1 = require("./dto/create-layout-type.dto");
const update_layout_type_dto_1 = require("./dto/update-layout-type.dto");
let LayoutTypesController = class LayoutTypesController {
    layoutTypesService;
    constructor(layoutTypesService) {
        this.layoutTypesService = layoutTypesService;
    }
    create(createLayoutTypeDto) {
        return this.layoutTypesService.create(createLayoutTypeDto);
    }
    async findAll(start, end, sort, order, q, res) {
        const where = {
            AND: [],
        };
        if (q) {
            where.AND.push({
                OR: [
                    { nameEn: { contains: q, mode: 'insensitive' } },
                    { nameRu: { contains: q, mode: 'insensitive' } },
                    { code: { contains: q, mode: 'insensitive' } },
                ],
            });
        }
        const orderBy = {};
        if (sort) {
            orderBy[sort] = order?.toLowerCase() === 'asc' ? 'asc' : 'desc';
        }
        else {
            orderBy.sortOrder = 'asc';
        }
        const take = end && start ? Number(end) - Number(start) : undefined;
        const skip = start ? Number(start) : undefined;
        const items = await this.layoutTypesService.findAll({
            where,
            orderBy,
            skip,
            take
        });
        const total = await this.layoutTypesService.findAll({ where }); // Not efficient for total count but okay for now
        res.set('x-total-count', total.length.toString());
        res.set('Access-Control-Expose-Headers', 'x-total-count');
        return res.json(items);
    }
    findOne(id) {
        return this.layoutTypesService.findOne(id);
    }
    update(id, updateLayoutTypeDto) {
        return this.layoutTypesService.update(id, updateLayoutTypeDto);
    }
    remove(id) {
        return this.layoutTypesService.remove(id);
    }
};
exports.LayoutTypesController = LayoutTypesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_layout_type_dto_1.CreateLayoutTypeDto]),
    __metadata("design:returntype", void 0)
], LayoutTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('_start')),
    __param(1, (0, common_1.Query)('_end')),
    __param(2, (0, common_1.Query)('_sort')),
    __param(3, (0, common_1.Query)('_order')),
    __param(4, (0, common_1.Query)('q')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], LayoutTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LayoutTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_layout_type_dto_1.UpdateLayoutTypeDto]),
    __metadata("design:returntype", void 0)
], LayoutTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LayoutTypesController.prototype, "remove", null);
exports.LayoutTypesController = LayoutTypesController = __decorate([
    (0, common_1.Controller)('layout-types'),
    __metadata("design:paramtypes", [layout_types_service_1.LayoutTypesService])
], LayoutTypesController);
//# sourceMappingURL=layout-types.controller.js.map