import { Elysia, t } from "elysia";
export interface OrderDetailsDto {
  orderId: number;
  productDetailsId: number;
  quantity?: number;
}
export const orderDetailsDto = new Elysia({ name: "Dto.OrderDetails" }).model({
  "order.details.dto": t.Object({
    orderId: t.Numeric(),
    productDetailsId: t.Numeric(),
    quantity: t.Optional(t.Numeric()),
  }),
});
