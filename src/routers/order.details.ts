import { Elysia, t } from "elysia";
import { orderDetailsDto, } from "../dtos/orderDetails.dto";
import { OrderDetailsService } from "../services/orderDetails.service";
const orderDetails = new Elysia({ prefix: "order-details" })
  .use(orderDetailsDto)
  .get("/", () => OrderDetailsService.select())
  .put("/:id", ({ params: { id }, body }) => OrderDetailsService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "order.details.dto"
  })
  .post("/", ({ body }) => OrderDetailsService.create(body), {
    body: "order.details.dto"
  })
  .delete("/:id", ({ params: { id } }) => OrderDetailsService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => OrderDetailsService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default orderDetails;

