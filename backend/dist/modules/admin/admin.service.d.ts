import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings, SettingsDocument } from '../../database/schemas/settings.schema';
export declare class AdminService {
    private readonly usersService;
    private settingsModel;
    constructor(usersService: UsersService, settingsModel: Model<SettingsDocument>);
    getProfile(userId: string): Promise<{
        message: string;
        data: any;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        message: string;
        data: any;
    }>;
    getSettings(): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, SettingsDocument, {}, {}> & Settings & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    updateSettings(dto: UpdateSettingsDto): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, SettingsDocument, {}, {}> & Settings & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
