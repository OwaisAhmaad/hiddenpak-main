import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findAll(
    filter: FilterQuery<T> = {},
    options: { skip?: number; limit?: number; sort?: Record<string, any> } = {},
  ): Promise<T[]> {
    return this.model
      .find(filter)
      .skip(options.skip ?? 0)
      .limit(options.limit ?? 20)
      .sort(options.sort ?? { createdAt: -1 })
      .exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async updateById(id: string, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
