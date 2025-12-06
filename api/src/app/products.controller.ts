import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Controller('products')
export class ProductsController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // GET /api/products
  @Get()
  async getProducts() {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  // POST /api/products
  @Post()
  async addProduct(
    @Body() body: { name: string; price: number; stock: number; category: string }
  ) {
    const product = new this.productModel({
      name: body.name,
      price: body.price,
      stock: body.stock,
      category: body.category,
      createdAt: new Date(),
    });

    return product.save();
  }
}
