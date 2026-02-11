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
exports.TagCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const tag_categories_service_1 = require("./tag-categories.service");
const client_1 = require("@prisma/client");
let TagCategoriesController = class TagCategoriesController {
    tagCategoriesService;
    constructor(tagCategoriesService) {
        this.tagCategoriesService = tagCategoriesService;
    }
    create(data) {
        return this.tagCategoriesService.create(data);
    }
    async findAll(res) {
        const items = await this.tagCategoriesService.findAll();
        res.set('Content-Range', `tag-categories 0-${items.length}/${items.length}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        return res.json(items);
    }
    findOne(id) {
        return this.tagCategoriesService.findOne(id);
    }
    update(id, data) {
        return this.tagCategoriesService.update(id, data);
    }
    remove(id) {
        return this.tagCategoriesService.remove(id);
    }
};
exports.TagCategoriesController = TagCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TagCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TagCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TagCategoriesController.prototype, "remove", null);
exports.TagCategoriesController = TagCategoriesController = __decorate([
    (0, common_1.Controller)('tag-categories'),
    __metadata("design:paramtypes", [tag_categories_service_1.TagCategoriesService])
], TagCategoriesController);
//# sourceMappingURL=tag-categories.controller.js.map