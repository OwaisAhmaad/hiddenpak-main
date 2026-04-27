import { Request } from 'express';
export declare function imageFileFilter(_req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void): void;
export declare const singleImageOptions: {
    fileFilter: typeof imageFileFilter;
};
export declare const multiImageOptions: {
    fileFilter: typeof imageFileFilter;
};
