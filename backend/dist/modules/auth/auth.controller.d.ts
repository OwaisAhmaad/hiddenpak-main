import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
