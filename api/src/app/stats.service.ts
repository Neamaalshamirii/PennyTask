import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class StatsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async generateStats() {
    const totalUsers = await this.userModel.countDocuments();

    // Logins today (placeholder — add real tracking later)
    const loginsToday = Math.floor(Math.random() * 40);

    // Users created within last 7 days
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const newUsersThisWeek = await this.userModel.countDocuments({
      createdAt: { $gte: weekAgo },
    });

    return {
      totalUsers,
      loginsToday,
      newUsersThisWeek,
    };
  }
}
