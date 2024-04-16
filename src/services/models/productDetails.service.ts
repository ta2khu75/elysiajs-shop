import { ProductDetails } from "@prisma/client";
import { db } from "../../utils/prisma";
import { ProductDetailsDto } from "../../dtos/models/productDetails.dto";
export abstract class ProductDetailsService {
  static async create(body: ProductDetailsDto): Promise<ProductDetails> {
    return await db.productDetails.create({ data: body });
  }
  static async update(id: number, body: ProductDetailsDto):Promise<ProductDetails> {
    const { sizeId, optionId, price } = body;
    return await db.productDetails.update({
      data: {
        ...(sizeId ? { sizeId } : {}),
        ...(optionId ? { optionId } : {}),
        ...(price ? { price } : {}),
      },
      where: { id },
    });
  }
  static async find(id: number):Promise<ProductDetails|null> {
    return await db.productDetails.findFirst({ where: { id } });
  }
  static async select():Promise<ProductDetails[]> {
    return await db.productDetails.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number):Promise<ProductDetails> {
    return await db.productDetails.delete({ where: { id } });
  }
}
