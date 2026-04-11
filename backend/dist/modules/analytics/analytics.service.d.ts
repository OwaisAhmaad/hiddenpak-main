import { Model } from 'mongoose';
import { BlogDocument } from '../../database/schemas/blog.schema';
import { PlaceDocument } from '../../database/schemas/place.schema';
import { UserDocument } from '../../database/schemas/user.schema';
export declare class AnalyticsService {
    private blogModel;
    private placeModel;
    private userModel;
    constructor(blogModel: Model<BlogDocument>, placeModel: Model<PlaceDocument>, userModel: Model<UserDocument>);
    summary(): Promise<{
        totalBlogs: number;
        totalPlaces: number;
        totalUsers: number;
        monthlyNewBlogs: any[];
        monthlyNewUsers: any[];
    }>;
}
