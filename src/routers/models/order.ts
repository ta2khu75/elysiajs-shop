import { Elysia, t } from "elysia";
import { orderDto } from "../../dtos/models/order.dto";
import { OrderService } from "../../services/models/order.service";
const order = new Elysia({ prefix: "order" })
  .use(orderDto)
  .get("/", () => OrderService.select())
  .put(
    "/:id",
    ({ params: { id }, body }) => {
      return OrderService.update(id, body);
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
      return await OrderService.create(body);
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
