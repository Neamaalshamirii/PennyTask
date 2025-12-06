import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

import { User, UserDocument } from './user.schema';
import { MailService } from '../../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  async generateToken(user: UserDocument) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = await this.jwt.signAsync(payload);

    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;

    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user : null;
  }

  async signup(name: string, email: string, password: string) {
    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      passwordHash,
      lastLoginAt: null,
    });

    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLoginAt = new Date();
    await user.save();

    return this.generateToken(user);
  }

  // 🔥 SEND RESET LINK
  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('Email not found');

    const token = randomBytes(32).toString('hex');

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutes
    await user.save();

    await this.mail.sendResetEmail(email, token);

    return { message: 'Reset link sent to your email' };
  }

  // 🔥 RESET PASSWORD
  async resetPassword(token: string, password: string) {
  // ❗ Only check that password is provided, no length rule
  if (!password) {
    throw new BadRequestException('Password is required');
  }

  // Find user with valid token
  const user = await this.userModel.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new BadRequestException('Invalid or expired token');
  }

  // Save new password
  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  return { message: 'Password updated successfully' };
}

}
