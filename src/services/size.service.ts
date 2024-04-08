import { db } from "../utils/prisma";
import { SizeDto } from "../dtos/size.dto";
import { Size } from "@prisma/client";
export abstract class SizeService {
  static async create(body: SizeDto):Promise<Size> {
    return await db.size.create({ data: body });
  }
  static async update(id: number, body: SizeDto):Promise<Size> {
    const { name, productId } = body;
    return await db.size.update({
      data: { ...(name ? { name } : {}), ...(productId?{productId}:{}) },
      where: { id },
    });
  }
  static async find(id: number):Promise<Size|null> {
    return await db.size.findFirst({ where: { id } });
  }
  static async select():Promise<Size[]> {
    return await db.size.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number):Promise<Size> {
    return await db.size.delete({ where: { id } });
  }
}
