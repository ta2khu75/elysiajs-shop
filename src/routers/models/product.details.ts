import { Elysia, t } from "elysia";
import { productDetailsDto } from "../../dtos/models/productDetails.dto";
import { ProductDetailsService } from "../../services/models/productDetails.service";
import { BadRequestError } from "../../error/BadRequestError";
const productDetails = new Elysia({ prefix: "product-details" })
  .use(productDetailsDto)
  .get("/", () => ProductDetailsService.select())
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        await ProductDetailsService.update(id, body);
        return { message: "Product Details updated" };
      } catch (error) {
        throw new BadRequestError(
          "Could not update Product Details with error: " + error
        );
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "product.details.dto",
    }
  )
  .get(
    "/product/:id",
    async ({ params: { id } }) => {
      return await ProductDetailsService.findProduct(id);
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    "/",
    async ({ body }) => {
      try {
        await ProductDetailsService.create(body);
        return { message: "Product Details created" };
      } catch (error) {
        throw new BadRequestError(
          "Could not create Product Details with error: " + error
        );
      }
    },
    {
      body: "product.details.dto",
    }
  )
  .delete(
    "/:id",
    async({ params: { id } }) => {
      try {
        
      await ProductDetailsService.delete(id);
      return { message: "Product Details deleted" };
    } catch (error) {
        throw new BadRequestError("Could not delete product details with error: " + error)
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get("/:id", ({ params: { id } }) => ProductDetailsService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default productDetails;
