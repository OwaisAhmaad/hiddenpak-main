import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Reusable multer fileFilter — rejects non-image uploads with HTTP 400.
 * Pass as the `fileFilter` option in FileInterceptor / FilesInterceptor.
 */
export function imageFileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!ALLOWED_MIME.includes(file.mimetype)) {
    return cb(
      new BadRequestException(
        `Invalid file type "${file.mimetype}". Only JPEG, PNG and WEBP are allowed.`,
      ),
      false,
    );
  }
  cb(null, true);
}

/** Shared interceptor options for single-image uploads */
export const singleImageOptions = { fileFilter: imageFileFilter };

/** Shared interceptor options for multi-image uploads */
export const multiImageOptions = { fileFilter: imageFileFilter };
