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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const projects_service_1 = require("./projects.service");
const create_project_dto_1 = require("./dto/create-project.dto");
const update_project_dto_1 = require("./dto/update-project.dto");
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    create(createProjectDto) {
        return this.projectsService.create(createProjectDto);
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
            orderBy.createdAt = 'desc';
        }
        const projects = await this.projectsService.findAll({
            where,
            orderBy,
        });
        res.set('Content-Range', `projects 0-${projects.length}/${projects.length}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        return res.json(projects);
    }
    findOne(id) {
        return this.projectsService.findOne(id);
    }
    update(id, updateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }
    remove(id) {
        return this.projectsService.remove(id);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
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
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map