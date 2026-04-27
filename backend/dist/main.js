"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const path = require("path");
const fs = require("fs");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/http-exception.filter");
const response_interceptor_1 = require("./common/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    const origin = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
        .split(',')
        .map((s) => s.trim());
    app.enableCors({
        origin,
        credentials: true,
    });
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir))
        fs.mkdirSync(uploadsDir, { recursive: true });
    app.useStaticAssets(uploadsDir, {
        prefix: '/uploads',
        setHeaders: (res) => {
            res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
            res.setHeader('Access-Control-Allow-Origin', '*');
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('HiddenPak API')
        .setDescription(`## HiddenPak — Discover Pakistan's Hidden Gems

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
Only **JPEG, PNG, WEBP** accepted — others return 400.
Images are stored on-server at \`/uploads/<folder>/<uuid>.jpg\`.`)
        .setVersion('1.0')
        .setContact('HiddenPak Team', 'https://hiddenpak.com', 'hello@hiddenpak.com')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addServer(`http://localhost:${process.env.PORT ?? 4000}`, 'Local Development')
        .addServer('https://api.hiddenpak.com', 'Production')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'access-token')
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
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
    console.log(`📁 Uploads served  → http://localhost:${port}/uploads/`);
    console.log(`📖 Swagger Docs    → http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map