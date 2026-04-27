/**
 * LocalStorageService (drop-in Cloudinary replacement)
 *
 * Saves uploaded images to  /uploads/<folder>/<uuid>.jpg  on disk.
 * Files are served as static assets from the NestJS server.
 *
 * Class kept as "CloudinaryService" so every existing injection token
 * continues to work without touching the 8 modules that use it.
 */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export interface UploadResult {
  url: string;
  publicId: string;
}

@Injectable()
export class CloudinaryService {
  private readonly uploadDir: string;
  private readonly baseUrl: string;

  constructor(config: ConfigService) {
    // In production set BASE_URL=https://api.hiddenpak.com (or same domain)
    this.baseUrl =
      config.get<string>('BASE_URL') ?? `http://localhost:${config.get('PORT') ?? 4000}`;

    // Absolute path to uploads folder (next to package.json)
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async upload(buffer: Buffer, folder = 'hiddenpak'): Promise<UploadResult> {
    try {
      const dir = path.join(this.uploadDir, folder);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const filename = `${crypto.randomUUID()}.jpg`;
      const filepath = path.join(dir, filename);
      fs.writeFileSync(filepath, buffer);

      const publicId = `${folder}/${filename}`;
      const url = `${this.baseUrl}/uploads/${publicId}`;
      return { url, publicId };
    } catch {
      throw new InternalServerErrorException('File upload failed');
    }
  }

  async delete(publicId: string): Promise<void> {
    try {
      const filepath = path.join(this.uploadDir, publicId);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    } catch {
      // ignore — file may already be gone
    }
  }
}
