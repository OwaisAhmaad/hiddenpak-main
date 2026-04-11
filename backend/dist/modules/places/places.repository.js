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
exports.PlacesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../common/base.repository");
const place_schema_1 = require("../../database/schemas/place.schema");
let PlacesRepository = class PlacesRepository extends base_repository_1.BaseRepository {
    constructor(placeModel) {
        super(placeModel);
        this.placeModel = placeModel;
    }
    buildFilter(opts) {
        const filter = {};
        if (opts.published !== undefined)
            filter.published = opts.published;
        if (opts.region)
            filter.region = { $regex: opts.region, $options: 'i' };
        if (opts.category)
            filter.category = { $regex: opts.category, $options: 'i' };
        if (opts.search) {
            filter.$or = [
                { name: { $regex: opts.search, $options: 'i' } },
                { description: { $regex: opts.search, $options: 'i' } },
                { region: { $regex: opts.search, $options: 'i' } },
            ];
        }
        return filter;
    }
};
exports.PlacesRepository = PlacesRepository;
exports.PlacesRepository = PlacesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(place_schema_1.Place.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PlacesRepository);
//# sourceMappingURL=places.repository.js.map