"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLayoutTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_layout_type_dto_1 = require("./create-layout-type.dto");
class UpdateLayoutTypeDto extends (0, mapped_types_1.PartialType)(create_layout_type_dto_1.CreateLayoutTypeDto) {
}
exports.UpdateLayoutTypeDto = UpdateLayoutTypeDto;
//# sourceMappingURL=update-layout-type.dto.js.map