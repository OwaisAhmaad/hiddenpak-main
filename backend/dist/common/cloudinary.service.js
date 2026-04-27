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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
let CloudinaryService = class CloudinaryService {
    constructor(config) {
        this.baseUrl =
            config.get('BASE_URL') ?? `http://localhost:${config.get('PORT') ?? 4000}`;
        this.uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async upload(buffer, folder = 'hiddenpak') {
        try {
            const dir = path.join(this.uploadDir, folder);
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir, { recursive: true });
            const filename = `${crypto.randomUUID()}.jpg`;
            const filepath = path.join(dir, filename);
            fs.writeFileSync(filepath, buffer);
            const publicId = `${folder}/${filename}`;
            const url = `${this.baseUrl}/uploads/${publicId}`;
            return { url, publicId };
        }
        catch {
            throw new common_1.InternalServerErrorException('File upload failed');
        }
    }
    async delete(publicId) {
        try {
            const filepath = path.join(this.uploadDir, publicId);
            if (fs.existsSync(filepath))
                fs.unlinkSync(filepath);
        }
        catch {
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map