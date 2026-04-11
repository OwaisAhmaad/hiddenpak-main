import { AdminService } from './admin.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getProfile(req: any): Promise<{
        message: string;
        data: any;
    }>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        message: string;
        data: any;
    }>;
    getSettings(): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../database/schemas/settings.schema").SettingsDocument, {}, {}> & import("../../database/schemas/settings.schema").Settings & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    updateSettings(dto: UpdateSettingsDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../database/schemas/settings.schema").SettingsDocument, {}, {}> & import("../../database/schemas/settings.schema").Settings & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
