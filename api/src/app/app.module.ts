import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth.module';

// Users
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';

// Stats
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

// Products
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './product.schema';

@Module({
  imports: [
    // Connect to MongoDB from .env
    MongooseModule.forRoot(process.env.MONGO_URI),

    // Register Mongo Schemas
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema }, // ⬅️ added product schema
    ]),

    // Authentication (login/signup)
    AuthModule,
  ],

  controllers: [
    AppController,
    StatsController,
    UsersController,
    ProductsController, // ⬅️ added product controller
  ],

  providers: [
    AppService,
    StatsService,
  ],
})
export class AppModule {}
