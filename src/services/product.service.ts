import { Product } from "@prisma/client";
import { db } from "../utils/prisma";
import { ProductDto } from "../dtos/product.dto";

export abstract class ProductService {
  static async create(data: ProductDto): Promise<Product> {
    return await db.product.create({
      data: { ...data, thumbnail: "" },
    });
  }
  static async update(
    id: number,
    data: ProductDto,
    thumbnail?: string
  ): Promise<Product> {
    const { categoryId, userId, name, active } = data;
    return await db.product.update({
      data: {
        ...(categoryId ? { categoryId } : {}),
        ...(userId ? { userId } : {}),
        ...(name ? { name } : {}),
        ...(thumbnail ? { thumbnail } : {}),
        ...(active !== undefined ? { active } : {}),
      },
      where: { id },
    });
  }
  static async find(id: number):Promise<Product|null> {
    return await db.product.findFirst({ where: { id } });
  }
  static async delete(id: number):Promise<Product> {
    return await db.product.delete({ where: { id } });
  }
  static async select():Promise<Product[]> {
    return await db.product.findMany();
  }
}
