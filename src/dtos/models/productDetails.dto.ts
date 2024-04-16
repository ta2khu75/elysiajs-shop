import Elysia, { t } from "elysia";
export interface ProductDetailsDto {
  optionId?: number;
  sizeId?: number;
  price: number;
}
export const productDetailsDto = new Elysia({ name: "dto.product.details" }).model({
  "product.details.dto": t.Object({
    optionId: t.Optional(t.Numeric()),
    sizeId: t.Optional(t.Numeric()),
    price: t.Numeric(),
  }),
});
