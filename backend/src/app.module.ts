import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { PlacesModule } from './modules/places/places.module';
import { UsersModule } from './modules/users/users.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI') || config.get<string>('MONGODB_URI'),
      }),
    }),
    AdminModule,
    AuthModule,
    UsersModule,
    BlogsModule,
    PlacesModule,
    GalleryModule,
    CategoriesModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
