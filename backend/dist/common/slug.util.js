"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
const slugify_1 = require("slugify");
function generateSlug(text) {
    return (0, slugify_1.default)(text, { lower: true, strict: true, trim: true });
}
//# sourceMappingURL=slug.util.js.map