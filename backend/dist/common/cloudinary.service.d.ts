import { ConfigService } from '@nestjs/config';
export interface UploadResult {
    url: string;
    publicId: string;
}
export declare class CloudinaryService {
    constructor(config: ConfigService);
    upload(buffer: Buffer, folder?: string): Promise<UploadResult>;
    delete(publicId: string): Promise<any>;
}
