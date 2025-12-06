import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Controller('stats')
export class StatsController {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  @Get()
  async getStats() {
    // Total user count
    const totalUsers = await this.userModel.countDocuments();

    // 🔵 Logins today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const loginsToday = await this.userModel.countDocuments({
      lastLoginAt: { $gte: startOfDay }
    });

    // 🟢 New users this week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);

    const newUsersThisWeek = await this.userModel.countDocuments({
      createdAt: { $gte: startOfWeek }
    });

    return {
      totalUsers,
      loginsToday,
      newUsersThisWeek,
    };
  }
}
