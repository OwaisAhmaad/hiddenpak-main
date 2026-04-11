"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPagination = buildPagination;
exports.buildMeta = buildMeta;
function buildPagination(query) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 10));
    return { skip: (page - 1) * limit, limit, page };
}
function buildMeta(total, page, limit) {
    return { total, page, limit, totalPages: Math.ceil(total / limit) };
}
//# sourceMappingURL=pagination.util.js.map