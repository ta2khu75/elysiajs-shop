import { Product } from "@prisma/client";
import { db } from "../../utils/prisma";
import { ProductDto } from "../../dtos/models/product.dto";
import { v4 as uuidv4 } from "uuid";
export abstract class ProductService {
  static async create(body: ProductDto): Promise<Product> {
    let fileName = "";
    if (body.thumbnail) {
      const file = Bun.file(body.thumbnail.name);
      const [, type] = file.type.split("/");
      fileName = `${uuidv4()}.${type}`;
    }
    const product = await db.product.create({
      data: { ...body, thumbnail: fileName },
    });
    if (body.thumbnail) {
      const pathName = `uploads/image/product/${fileName}`;
      await Bun.write(pathName, body.thumbnail);
    }
    return product;
  }
  static async update(id: number, data: ProductDto): Promise<Product> {
    let fileName = "";
    if (data.thumbnail) {
      const file = Bun.file(data.thumbnail.name);
      const [, type] = file.type.split("/");
      fileName = `${uuidv4()}.${type}`;
    }
    const { categoryId, userId, name, active } = data;
    const product = await db.product.update({
      data: {
        ...(categoryId ? { categoryId } : {}),
        ...(userId ? { userId } : {}),
        ...(name ? { name } : {}),
        ...(fileName !== "" ? { thumbnail: fileName } : {}),
        ...(active !== undefined ? { active } : {}),
      },
      where: { id },
    });
    if (data.thumbnail) {
      const pathName = `uploads/image/product/${fileName}`;
      await Bun.write(pathName, data.thumbnail);
      return product;
    }
    return product;
  }
  static async find(id: number): Promise<Product | null> {
    return await db.product.findFirst({ where: { id } });
  }
  static async delete(id: number): Promise<Product> {
    return await db.product.delete({ where: { id } });
  }
  static async select(): Promise<Product[]> {
    return await db.product.findMany({include: {category:true}});
  }
}
