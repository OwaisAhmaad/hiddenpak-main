import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BlogDocument, Blog } from '../../database/schemas/blog.schema';
import { PlaceDocument, Place } from '../../database/schemas/place.schema';
import { UserDocument, User } from '../../database/schemas/user.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Place.name) private placeModel: Model<PlaceDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async summary() {
    const totalBlogs = await this.blogModel.countDocuments().exec();
    const totalPlaces = await this.placeModel.countDocuments().exec();
    const totalUsers = await this.userModel.countDocuments().exec();

    // monthly new blogs (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const monthlyNewBlogs = await this.blogModel
      .aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ])
      .exec();

    const monthlyNewUsers = await this.userModel
      .aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ])
      .exec();

    return {
      totalBlogs,
      totalPlaces,
      totalUsers,
      monthlyNewBlogs,
      monthlyNewUsers,
    };
  }
}
