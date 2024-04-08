import { ProductImage } from "@prisma/client";
import { db } from "../utils/prisma";
import { ProductImageDto } from "../dtos/productImage.dto";
export abstract class ProductImageService {
  static async create(body: ProductImageDto):Promise<ProductImage> {
    return await db.productImage.create({ data: body });
  }
  static async update(id: number, body: ProductImageDto):Promise<ProductImage> {
    const { image, productId } = body;
    return await db.productImage.update({
      data: { ...(image ? { image } : {}), ...(productId?{productId}:{}) },
      where: { id },
    });
  }
  static async find(id: number):Promise<ProductImage|null> {
    return await db.productImage.findFirst({ where: { id } });
  }
  static async select():Promise<ProductImage[]> {
    return await db.productImage.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number):Promise<ProductImage> {
    return await db.productImage.delete({ where: { id } });
  }
}
