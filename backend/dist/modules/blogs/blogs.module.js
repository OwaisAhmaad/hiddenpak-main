"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cloudinary_service_1 = require("../../common/cloudinary.service");
const blog_schema_1 = require("../../database/schemas/blog.schema");
const blogs_controller_1 = require("./blogs.controller");
const blogs_repository_1 = require("./blogs.repository");
const blogs_service_1 = require("./blogs.service");
let BlogsModule = class BlogsModule {
};
exports.BlogsModule = BlogsModule;
exports.BlogsModule = BlogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: blog_schema_1.Blog.name, schema: blog_schema_1.BlogSchema }]),
        ],
        controllers: [blogs_controller_1.BlogsPublicController, blogs_controller_1.BlogsAdminController],
        providers: [blogs_service_1.BlogsService, blogs_repository_1.BlogsRepository, cloudinary_service_1.CloudinaryService],
    })
], BlogsModule);
//# sourceMappingURL=blogs.module.js.map