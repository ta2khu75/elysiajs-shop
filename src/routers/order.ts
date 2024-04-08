import { Elysia, t } from "elysia";
import { orderDto } from "../dtos/order.dto";
import { OrderService } from "../services/order.service";
import { Order, OrderStatus } from "@prisma/client";
const order = new Elysia({ prefix: "order" })
  .use(orderDto)
  .get("/", () => OrderService.select())
  .put(
    "/:id",
    ({ params: { id }, body }) => {
      let status;
      switch (body.status.toUpperCase()) {
        case OrderStatus.SHIPPED:
          status = OrderStatus.SHIPPED;
          break;
        case OrderStatus.CANCELLED:
          status = OrderStatus.CANCELLED;
          break;
        case OrderStatus.DELIVERED:
          status = OrderStatus.DELIVERED;
          break;
        case OrderStatus.PROCESSING:
          status = OrderStatus.PROCESSING;
          break;
        default:
          status = OrderStatus.PENDING;
      }
      const order = { addressId: body.addressId, note: body.note, status };
      return OrderService.update(id, order);
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "order.dto",
    }
  )
  .post(
    "/",
    async ({ body }) => {
      let status;
      switch (body.status.toUpperCase()) {
        case OrderStatus.SHIPPED:
          status = OrderStatus.SHIPPED;
          break;
        case OrderStatus.CANCELLED:
          status = OrderStatus.CANCELLED;
          break;
        case OrderStatus.DELIVERED:
          status = OrderStatus.DELIVERED;
          break;
        case OrderStatus.PROCESSING:
          status = OrderStatus.PROCESSING;
          break;
        default:
          status = OrderStatus.PENDING;
      }
      const order = { addressId: body.addressId, note: body.note, status };
      return await OrderService.create(order);
    },
    {
      body: "order.dto",
    }
  )
  .delete("/:id", ({ params: { id } }) => OrderService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => OrderService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default order;
