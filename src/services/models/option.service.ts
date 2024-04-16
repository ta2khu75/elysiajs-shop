import { db } from "../../utils/prisma";
import { OptionDto } from "../../dtos/models/option.dto";
import { Option } from "@prisma/client";
export abstract class OptionService {
  static async create(body: OptionDto): Promise<Option> {
    return await db.option.create({ data: body });
  }
  static async update(id: number, body: OptionDto): Promise<Option> {
    const { name, productId } = body;
    return await db.option.update({
      data: { ...(name ? { name } : {}), ...(productId ? { productId } : {}) },
      where: { id },
    });
  }
  static findProduct (id: number){
    return db.option.findMany({ where: { productId:id } });
  }
  static async find(id: number): Promise<Option | null> {
    return await db.option.findFirst({ where: { id } });
  }
  static async select(): Promise<Option[]> {
    return await db.option.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number): Promise<Option> {
    return await db.option.delete({ where: { id } });
  }
}
