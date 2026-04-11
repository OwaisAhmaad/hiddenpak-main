"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const slugify_1 = require("slugify");
const app_module_1 = require("./app.module");
const category_schema_1 = require("./database/schemas/category.schema");
const users_service_1 = require("./modules/users/users.service");
function makeSlug(text) {
    return (0, slugify_1.default)(text, { lower: true, strict: true, trim: true });
}
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const users = app.get(users_service_1.UsersService);
    const existing = await users.findByEmail('admin@hiddenpak.com');
    if (!existing) {
        await users.createAdmin('admin@hiddenpak.com', 'Admin@123456');
        console.log('✅ Admin created: admin@hiddenpak.com / Admin@123456');
    }
    else {
        console.log('ℹ️  Admin already exists');
    }
    const categoryModel = app.get((0, mongoose_1.getModelToken)(category_schema_1.Category.name));
    const existingCount = await categoryModel.countDocuments();
    if (existingCount > 0) {
        console.log(`ℹ️  Categories already seeded (${existingCount} found), skipping`);
    }
    else {
        const villages = [
            'Kalash Valley',
            'Ushi Village',
            'Hundur Village',
            'Shigar Village',
            'Altit Village',
        ];
        const cities = [
            'Gilgit City',
            'Skardu City',
            'Chitral City',
            'Hunza City',
            'Abbottabad City',
        ];
        const categoryDocs = [
            ...villages.map((name) => ({
                name,
                slug: makeSlug(name),
                type: category_schema_1.CategoryType.VILLAGE,
                description: '',
            })),
            ...cities.map((name) => ({
                name,
                slug: makeSlug(name),
                type: category_schema_1.CategoryType.CITY,
                description: '',
            })),
        ];
        await categoryModel.insertMany(categoryDocs);
        console.log(`✅ Seeded ${categoryDocs.length} categories`);
    }
    await app.close();
}
seed().catch(console.error);
//# sourceMappingURL=seed.js.map