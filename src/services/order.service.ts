import { db } from "../utils/prisma";
import { OrderDto } from "../dtos/order.dto";
import { Order } from "@prisma/client";
export abstract class OrderService {
  static async create(body: OrderDto): Promise<Order> {
    return await db.order.create({ data: body });
  }
  static async update(id: number, body: OrderDto) {
    const { addressId, note, status } = body;
    return await db.order.update({
      data: {
        ...(addressId ? { addressId } : {}),
        ...(note ? { note } : {}),
        ...(status ? { status } : {}),
      },
      where: { id },
    });
  }
  static async find(id: number): Promise<Order | null> {
    return await db.order.findFirst({ where: { id } });
  }
  static async select(): Promise<Order[]> {
    return await db.order.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number): Promise<Order | void> {
    return await db.order.delete({ where: { id } });
  }
}
