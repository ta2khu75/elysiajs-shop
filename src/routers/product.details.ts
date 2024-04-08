import { Elysia, t } from "elysia";
import { productDetailsDto } from "../dtos/productDetails.dto";
import { ProductDetailsService } from "../services/productDetails.service";
const productDetails = new Elysia({ prefix: "product-details" })
  .use(productDetailsDto)
  .get("/", () => ProductDetailsService.select())
  .put(
    "/:id",
    ({ params: { id }, body }) => ProductDetailsService.update(id, body),
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "product.details.dto",
    }
  )
  .post("/", ({ body }) => ProductDetailsService.create(body), {
    body: "product.details.dto",
  })
  .delete("/:id", ({ params: { id } }) => ProductDetailsService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => ProductDetailsService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default productDetails;
