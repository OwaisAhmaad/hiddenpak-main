import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private svc;
    constructor(svc: AnalyticsService);
    getSummary(): Promise<{
        message: string;
        data: {
            totalBlogs: number;
            totalPlaces: number;
            totalUsers: number;
            monthlyNewBlogs: any[];
            monthlyNewUsers: any[];
        };
    }>;
}
