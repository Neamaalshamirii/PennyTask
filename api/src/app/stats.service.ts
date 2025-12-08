import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class StatsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async generateStats() {
    // 1) Total users
    const totalUsers = await this.userModel.countDocuments();

    // 2) Logins today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const loginsToday = await this.userModel.countDocuments({
      lastLoginAt: { $gte: startOfDay },
    });

    // 3) New users this week (last 7 days)
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const newUsersThisWeek = await this.userModel.countDocuments({
      createdAt: { $gte: startOfWeek },
    });

    return {
      totalUsers,
      loginsToday,
      newUsersThisWeek,
    };
  }
}
