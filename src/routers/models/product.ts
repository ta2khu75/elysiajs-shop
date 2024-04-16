import Elysia from "elysia";
import { productDto } from "../../dtos/models/product.dto";
import { ProductService } from "../../services/models/product.service";
import id from "../../dtos/id.dto";
import { BadRequestError } from "../../error/BadRequestError";
const product = new Elysia({ prefix: "product" })
  .use(productDto)
  .use(id)
  .get("/", () => ProductService.select())
  .get("/:id", ({ params: { id } }) => ProductService.find(id), {
    params: "id.dto",
  })
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        await ProductService.delete(id);
        return { message: "Product deleted successfully" };
      } catch (error) {
        throw new BadRequestError(
          "Couldn't delete product with error: " + error
        );
      }
    },
    {
      params: "id.dto",
    }
  )
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        await ProductService.update(id, body);
        return { message: "Product updated successfully" };
      } catch (error) {
        throw new BadRequestError(
          "could not update product with error" + error
        );
      }
    },
    {
      params: "id.dto",
      body: "product.dto",
    }
  )
  .get("/image/:name", async ({ params: { name } }) => {
    return Bun.file(`uploads/image/product/${name}`);
  })
  .post(
    "/",
    async ({ body }) => {
      try {
        await ProductService.create(body);
        return { message: "Product created successfully" };
      } catch (error) {
        throw new BadRequestError(
          "could not create product with error: " + error
        );
      }
    },
    {
      body: "product.dto",
    }
  );
export default product;
