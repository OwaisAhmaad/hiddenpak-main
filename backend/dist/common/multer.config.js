"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiImageOptions = exports.singleImageOptions = void 0;
exports.imageFileFilter = imageFileFilter;
const common_1 = require("@nestjs/common");
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
function imageFileFilter(_req, file, cb) {
    if (!ALLOWED_MIME.includes(file.mimetype)) {
        return cb(new common_1.BadRequestException(`Invalid file type "${file.mimetype}". Only JPEG, PNG and WEBP are allowed.`), false);
    }
    cb(null, true);
}
exports.singleImageOptions = { fileFilter: imageFileFilter };
exports.multiImageOptions = { fileFilter: imageFileFilter };
//# sourceMappingURL=multer.config.js.map