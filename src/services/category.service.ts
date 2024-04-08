import { db } from "../utils/prisma";
import { CategoryDto } from "../dtos/category.dto";
import { Category } from "@prisma/client";
export abstract class CategoryService {
  static async create(body: CategoryDto): Promise<Category> {
    return await db.category.create({ data: body });
  }
  static async update(id: number, body: CategoryDto): Promise<Category> {
    const { name } = body;
    return await db.category.update({
      data: { ...(name ? { name } : {}) },
      where: { id },
    });
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
