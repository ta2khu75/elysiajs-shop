import { db } from "../../utils/prisma";
import { OrderDto } from "../../dtos/models/order.dto";
import { Order,Status } from "@prisma/client";
export abstract class OrderService {
  static async create(body: OrderDto): Promise<Order> {
     let status;
      switch (body?.status?.toUpperCase()) {
        case Status.SHIPPED:
          status = Status.SHIPPED;
          break;
        case Status.CANCELLED:
          status = Status.CANCELLED;
          break;
        case Status.DELIVERED:
          status = Status.DELIVERED;
          break;
        case Status.PROCESSING:
          status = Status.PROCESSING;
          break;
        default:
          status = Status.PENDING;
      }
    return await db.order.create({ data: {...body, status} });
  }
  static async update(id: number, body: OrderDto) {
    let status;
      switch (body?.status?.toUpperCase()) {
        case Status.SHIPPED:
          status = Status.SHIPPED;
          break;
        case Status.CANCELLED:
          status = Status.CANCELLED;
          break;
        case Status.DELIVERED:
          status = Status.DELIVERED;
          break;
        case Status.PROCESSING:
          status = Status.PROCESSING;
          break;
        default:
          status = Status.PENDING;
      }
    const { addressId, note} = body;
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
