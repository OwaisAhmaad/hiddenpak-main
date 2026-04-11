import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base.repository';
import { UserDocument } from '../../database/schemas/user.schema';
export declare class UsersRepository extends BaseRepository<UserDocument> {
    constructor(model: Model<UserDocument>);
}
