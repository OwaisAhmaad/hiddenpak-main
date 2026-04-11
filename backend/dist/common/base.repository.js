"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async findOne(filter) {
        return this.model.findOne(filter).exec();
    }
    async findAll(filter = {}, options = {}) {
        return this.model
            .find(filter)
            .skip(options.skip ?? 0)
            .limit(options.limit ?? 20)
            .sort(options.sort ?? { createdAt: -1 })
            .exec();
    }
    async count(filter = {}) {
        return this.model.countDocuments(filter).exec();
    }
    async updateById(id, update) {
        return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }
    async deleteById(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map