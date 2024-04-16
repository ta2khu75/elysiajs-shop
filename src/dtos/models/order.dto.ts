import Elysia, { t } from "elysia";

export interface OrderDto {
  addressId: number;
  note: string;
  status?: string;
}
export const orderDto = new Elysia({ name: "dto.order" }).model({
  "order.dto": t.Object({
    addressId: t.Numeric(),
    note: t.String(),
    status: t.Optional(t.String())
  }),
});
