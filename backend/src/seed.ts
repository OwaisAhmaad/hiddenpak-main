import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modules/users/users.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const users = app.get(UsersService);

  const existing = await users.findByEmail('admin@hiddenpak.com');
  if (!existing) {
    await users.createAdmin('admin@hiddenpak.com', 'Admin@123456');
    console.log('✅ Admin created: admin@hiddenpak.com / Admin@123456');
  } else {
    console.log('ℹ️  Admin already exists');
  }

  await app.close();
}

seed().catch(console.error);
