import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

export interface UploadResult {
  url: string;
  publicId: string;
}

@Injectable()
export class CloudinaryService {
  constructor(config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
  }

  upload(
    buffer: Buffer,
    folder = 'hiddenpak',
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (err, result: UploadApiResponse) => {
          if (err || !result) {
            reject(new InternalServerErrorException('Upload failed'));
          } else {
            resolve({ url: result.secure_url, publicId: result.public_id });
          }
        },
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });
  }

  async delete(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}
