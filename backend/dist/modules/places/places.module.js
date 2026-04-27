"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cloudinary_service_1 = require("../../common/cloudinary.service");
const place_schema_1 = require("../../database/schemas/place.schema");
const places_controller_1 = require("./places.controller");
const places_repository_1 = require("./places.repository");
const places_service_1 = require("./places.service");
let PlacesModule = class PlacesModule {
};
exports.PlacesModule = PlacesModule;
exports.PlacesModule = PlacesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: place_schema_1.Place.name, schema: place_schema_1.PlaceSchema }]),
        ],
        controllers: [places_controller_1.PlacesPublicController, places_controller_1.PlacesAdminController],
        providers: [places_service_1.PlacesService, places_repository_1.PlacesRepository, cloudinary_service_1.CloudinaryService],
    })
], PlacesModule);
//# sourceMappingURL=places.module.js.map