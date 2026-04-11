import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
export declare class BaseRepository<T extends Document> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findAll(filter?: FilterQuery<T>, options?: {
        skip?: number;
        limit?: number;
        sort?: Record<string, any>;
    }): Promise<T[]>;
    count(filter?: FilterQuery<T>): Promise<number>;
    updateById(id: string, update: UpdateQuery<T>): Promise<T | null>;
    deleteById(id: string): Promise<T | null>;
}
