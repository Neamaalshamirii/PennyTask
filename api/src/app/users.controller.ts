import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  @Get()
  async getAllUsers() {
    const users = await this.userModel.find({}, { password: 0 }).lean();
    return users;
  }
}
