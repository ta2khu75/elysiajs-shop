import Elysia, { t } from "elysia";

export interface ProductDto {
  categoryId: number;
  userId: number;
  name: string;
  thumbnail: File;
  active?: boolean;
}
export const productDto = new Elysia({ name: "dto.product" }).model({
  "product.dto": t.Object({
    categoryId: t.Numeric(),
    userId: t.Numeric(),
    name: t.String(),
    thumbnail: t.File({
      type: ["image/png", "image/jpeg"],
      maxSize: `${5}${"m"}`,
    }),
    active: t.Optional(t.BooleanString()),
  }),
});
