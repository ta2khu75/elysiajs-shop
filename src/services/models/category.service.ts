import { db } from "../../utils/prisma";
import { CategoryDto } from "../../dtos/models/category.dto";
import { Category } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import category from "../../routers/models/category";
export abstract class CategoryService {
  static async create(body: CategoryDto): Promise<Category> {
    let fileName = "";
    if (body.image) {
      const file = Bun.file(body.image.name);
      const [, type] = file.type.split("/");
      fileName = `${uuidv4()}.${type}`;
    }
    const category = await db.category.create({
      data: { ...body, image: fileName },
    });
    if (body.image) {
      const pathName = `uploads/image/category/${fileName}`;
      await Bun.write(pathName, body.image);
    }
    return category;
  }
  static async update(id: number, body: CategoryDto): Promise<Category> {
    let fileName = "";
    if (body.image) {
      const file = Bun.file(body.image.name);
      const [, type] = file.type.split("/");
      fileName = `${uuidv4()}.${type}`;
    }
    const { name} = body;
    const category = await db.category.update({
      data: {
        ...(name ? { name } : {}),
        ...(fileName !== "" ? { image: fileName } : {}),
      },
      where: { id },
    });
    if (body.image) {
      const pathName = `uploads/image/category/${fileName}`;
      await Bun.write(pathName, body.image);
    }
    return category;
  }
  static async find(id: number): Promise<Category | null> {
    return await db.category.findFirst({ where: { id } });
  }
  static async select(): Promise<Category[]> {
    return await db.category.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number): Promise<Category> {
    return await db.category.delete({ where: { id } });
  }
}
