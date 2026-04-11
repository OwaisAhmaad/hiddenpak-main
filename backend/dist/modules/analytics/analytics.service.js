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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const blog_schema_1 = require("../../database/schemas/blog.schema");
const place_schema_1 = require("../../database/schemas/place.schema");
const user_schema_1 = require("../../database/schemas/user.schema");
let AnalyticsService = class AnalyticsService {
    constructor(blogModel, placeModel, userModel) {
        this.blogModel = blogModel;
        this.placeModel = placeModel;
        this.userModel = userModel;
    }
    async summary() {
        const totalBlogs = await this.blogModel.countDocuments().exec();
        const totalPlaces = await this.placeModel.countDocuments().exec();
        const totalUsers = await this.userModel.countDocuments().exec();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        const monthlyNewBlogs = await this.blogModel
            .aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ])
            .exec();
        const monthlyNewUsers = await this.userModel
            .aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } },
        ])
            .exec();
        return {
            totalBlogs,
            totalPlaces,
            totalUsers,
            monthlyNewBlogs,
            monthlyNewUsers,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(blog_schema_1.Blog.name)),
    __param(1, (0, mongoose_2.InjectModel)(place_schema_1.Place.name)),
    __param(2, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map