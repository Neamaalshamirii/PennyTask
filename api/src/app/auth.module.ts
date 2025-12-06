import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.schema';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from '../../mail/mail.service';  // ADD THIS

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'Neama2001',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  providers: [AuthService, MailService],   // ADD mail service here
  controllers: [AuthController],
})
export class AuthModule {}
