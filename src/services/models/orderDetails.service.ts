import { db } from "../../utils/prisma";
import { OrderDetailsDto } from "../../dtos/models/orderDetails.dto";
import { OrderDetails } from "@prisma/client";
export abstract class OrderDetailsService {
  static async create(body: OrderDetailsDto): Promise<OrderDetails> {
    return await db.orderDetails.create({ data: body });
  }
  static async update(
    id: number,
    body: OrderDetailsDto
  ): Promise<OrderDetails> {
    const { productDetailsId, orderId, quantity } = body;
    return await db.orderDetails.update({
      data: {
        ...(productDetailsId ? { productDetailsId } : {}),
        ...(orderId ? { orderId } : {}),
        ...(quantity ? { quantity } : {}),
      },
      where: { id },
    });
  }
  static async find(id: number): Promise<OrderDetails | null> {
    return await db.orderDetails.findFirst({ where: { id } });
  }
  static async select(): Promise<OrderDetails[]> {
    return await db.orderDetails.findMany({ orderBy: { id: "desc" } });
  }
  static async delete(id: number): Promise<OrderDetails> {
    return await db.orderDetails.delete({ where: { id } });
  }
}
