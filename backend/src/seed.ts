import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { AppModule } from './app.module';
import {
  Category,
  CategoryDocument,
  CategoryType,
} from './database/schemas/category.schema';
import { UsersService } from './modules/users/users.service';

function makeSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, trim: true });
}

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // ── Seed admin user ────────────────────────────────────────────────────────
  const users = app.get(UsersService);

  const existing = await users.findByEmail('admin@hiddenpak.com');
  if (!existing) {
    await users.createAdmin('admin@hiddenpak.com', 'Admin@123456');
    console.log('✅ Admin created: admin@hiddenpak.com / Admin@123456');
  } else {
    console.log('ℹ️  Admin already exists');
  }

  // ── Seed categories ────────────────────────────────────────────────────────
  const categoryModel = app.get<Model<CategoryDocument>>(
    getModelToken(Category.name),
  );

  const existingCount = await categoryModel.countDocuments();
  if (existingCount > 0) {
    console.log(`ℹ️  Categories already seeded (${existingCount} found), skipping`);
  } else {
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
        type: CategoryType.VILLAGE,
        description: '',
      })),
      ...cities.map((name) => ({
        name,
        slug: makeSlug(name),
        type: CategoryType.CITY,
        description: '',
      })),
    ];

    await categoryModel.insertMany(categoryDocs);
    console.log(`✅ Seeded ${categoryDocs.length} categories`);
  }

  await app.close();
}

seed().catch(console.error);
