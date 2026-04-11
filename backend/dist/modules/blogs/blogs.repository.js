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
exports.BlogsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../common/base.repository");
const blog_schema_1 = require("../../database/schemas/blog.schema");
let BlogsRepository = class BlogsRepository extends base_repository_1.BaseRepository {
    constructor(blogModel) {
        super(blogModel);
        this.blogModel = blogModel;
    }
    buildFilter(opts) {
        const filter = {};
        if (opts.status === 'published') {
            filter.published = true;
        }
        else if (opts.status === 'draft') {
            filter.published = false;
        }
        else if (opts.published !== undefined) {
            filter.published = opts.published;
        }
        if (opts.category) {
            filter.$or = [
                { category: { $regex: opts.category, $options: 'i' } },
                { categorySlug: opts.category.toLowerCase() },
            ];
        }
        if (opts.search) {
            const searchRegex = { $regex: opts.search, $options: 'i' };
            const searchFilter = {
                $or: [
                    { title: searchRegex },
                    { excerpt: searchRegex },
                    { content: searchRegex },
                    { author: searchRegex },
                ],
            };
            if (filter.$or) {
                filter.$and = [{ $or: filter.$or }, searchFilter];
                delete filter.$or;
            }
            else {
                filter.$or = searchFilter.$or;
            }
        }
        return filter;
    }
};
exports.BlogsRepository = BlogsRepository;
exports.BlogsRepository = BlogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogsRepository);
//# sourceMappingURL=blogs.repository.js.map