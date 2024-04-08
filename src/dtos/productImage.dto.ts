import Elysia, { t } from "elysia";

export interface ProductImageDto {
  productId: number;
  image:  File[];
}
export const productImageDto = new Elysia({ name: "dto.product.image" }).model({
  "product.image.dto": t.Object({
    image:t.Files({type:["image/png","image/jpeg"],maxSize: `${5}${"m"}`, maxItems:5, minItems:1 }),
    productId: t.Numeric()
    // image: t.Union([
    //   t.Array(
    //     t.File({ type: ["image/png", "image/jpeg"], maxSize: `${5}${"m"}` }),
    //     { maxItems: 5, minItems: 1 }
    //   ),
    //   t.File({ type: ["image/png", "image/jpeg"], maxSize: `${5}${"m"}` }),
    // ]),
    //image:t.Files({type:["image/png","image/jpeg"], maxSize:`${5}${'m'}`}),
  }),
});
