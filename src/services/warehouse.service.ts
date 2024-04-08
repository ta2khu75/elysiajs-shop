import { db } from "../utils/prisma";
import { WarehouseDto } from "../dtos/warehouse.dto";
import { Warehouse } from "@prisma/client";
export abstract class WarehouseService {
  static async create(body: WarehouseDto):Promise<Warehouse> {
    return await db.warehouse.create({ data: body });
  }
  static async update(id: number, body: WarehouseDto):Promise<Warehouse> {
    const { productDetailsId, remaining } = body;
    return await db.warehouse.update({
      data: {
        ...(productDetailsId ? { productDetailsId } : {}),
        ...(remaining ? { remaining } : {})
      },
      where: { id },
    });
  }
  static async find(id: number):Promise<Warehouse|null> {
    return await db.warehouse.findFirst({ where: { id } });
  }
  static async select():Promise<Warehouse[]> {
    return await db.warehouse.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number):Promise<Warehouse> {
    return await db.warehouse.delete({ where: { id } });
  }
}

