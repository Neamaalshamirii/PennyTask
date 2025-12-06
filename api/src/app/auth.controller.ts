import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // --------------------------
  // 🔵 SIGNUP
  // --------------------------
  @Post('signup')
  signup(@Body() body: { name: string; email: string; password: string }) {
    return this.auth.signup(body.name, body.email, body.password);
  }

  // --------------------------
  // 🟣 LOGIN
  // --------------------------
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.auth.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Save login timestamp for dashboard stats
    user.lastLoginAt = new Date();
    await user.save();

    return this.auth.generateToken(user);
  }

  // --------------------------
  // 🟡 FORGOT PASSWORD
  // --------------------------
  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.auth.forgotPassword(email);
  }

  // --------------------------
  // 🟢 RESET PASSWORD
  // --------------------------
  @Post('reset-password')
  resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    return this.auth.resetPassword(token, password);
  }
}
