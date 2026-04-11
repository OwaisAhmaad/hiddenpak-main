import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private users;
    constructor(config: ConfigService, users: UsersService);
    validate(req: Request, payload: {
        sub: string;
    }): Promise<{
        refreshToken: any;
        sub: string;
    }>;
}
export {};
