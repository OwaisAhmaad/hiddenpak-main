import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/http-exception.filter';
import { ResponseInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  /* ── Swagger ─────────────────────────────────────────────────── */
  const config = new DocumentBuilder()
    .setTitle('HiddenPak API')
    .setDescription(
      `## HiddenPak — Discover Pakistan's Hidden Gems

REST API for the HiddenPak travel platform.

### Authentication
All **admin write** endpoints require a Bearer JWT token.
1. Call \`POST /auth/login\` → copy \`accessToken\`
2. Click **Authorize** (top-right) → paste token as \`Bearer <token>\`

### Response Shape
Every response is wrapped:
\`\`\`json
{ "success": true, "message": "...", "data": { ... }, "meta": { ... } }
\`\`\`

### File Uploads
Upload endpoints accept \`multipart/form-data\`.
Only **JPEG, PNG, WEBP** accepted — others return 400.`,
    )
    .setVersion('1.0')
    .setContact('HiddenPak Team', 'https://hiddenpak.com', 'hello@hiddenpak.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer(`http://localhost:${process.env.PORT ?? 4000}`, 'Local Development')
    .addServer('https://api.hiddenpak.com', 'Production')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .addTag('Auth', 'Login, token refresh, logout')
    .addTag('Blogs — Public', 'Read blogs (no auth required)')
    .addTag('Blogs — Admin', 'Create / update / delete blogs (admin only)')
    .addTag('Places — Public', 'Read places (no auth required)')
    .addTag('Places — Admin', 'Create / update / delete places (admin only)')
    .addTag('Gallery — Public', 'Browse gallery (no auth required)')
    .addTag('Gallery — Admin', 'Upload / delete gallery images (admin only)')
    .addTag('Categories — Public', 'List categories (no auth required)')
    .addTag('Categories — Admin', 'Create / update / delete categories (admin only)')
    .addTag('Admin — Profile & Settings', 'Manage admin profile and site settings')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,       // keeps Bearer token across refreshes
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'HiddenPak API Docs',
    customfavIcon: 'https://hiddenpak.com/favicon.ico',
    customCss: `
      .swagger-ui .topbar { background: #0B0F19; }
      .swagger-ui .topbar-wrapper .link img { display: none; }
      .swagger-ui .topbar-wrapper .link::after {
        content: "HiddenPak API"; color: #F97316; font-size: 18px; font-weight: bold;
      }
    `,
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`🚀 HiddenPak API   → http://localhost:${port}/api/v1`);
  console.log(`📖 Swagger Docs    → http://localhost:${port}/api/docs`);
}

bootstrap();
