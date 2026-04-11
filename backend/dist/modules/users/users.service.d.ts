import { UsersRepository } from './users.repository';
export declare class UsersService {
    private repo;
    constructor(repo: UsersRepository);
    findById(id: string): Promise<import("../../database/schemas/user.schema").UserDocument>;
    findByEmail(email: string): Promise<import("../../database/schemas/user.schema").UserDocument>;
    setRefreshToken(id: string, token: string): Promise<import("../../database/schemas/user.schema").UserDocument>;
    clearRefreshToken(id: string): Promise<import("../../database/schemas/user.schema").UserDocument>;
    createAdmin(email: string, password: string): Promise<import("../../database/schemas/user.schema").UserDocument>;
    updateById(id: string, update: Record<string, any>): Promise<import("../../database/schemas/user.schema").UserDocument>;
}
