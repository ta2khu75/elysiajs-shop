import Elysia from "elysia";
import { v4 as uuidv4 } from "uuid";
import { productDto } from "../dtos/product.dto";
import { ProductService } from "../services/product.service";
import id from "../dtos/id.dto";
import { Product } from "@prisma/client";
const product = new Elysia({ prefix: "product" })
  .use(productDto)
  .use(id)
  .get("/", () => ProductService.select())
  .get("/:id", ({ params: { id } }) => ProductService.find(id), {
    params: "id.dto",
  })
  .delete("/:id", ({ params: { id } }) => ProductService.delete(id), {
    params: "id.dto",
  })
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      if (body.thumbnail) {
        const file = Bun.file(body.thumbnail.name);
        const [, type] = file.type.split("/");
        const fileName = `${uuidv4()}.${type}`;
        const product: Product = await ProductService.update(
          id,
          body,
          fileName
        );
        if (product) {
          const pathName = `uploads/image/${fileName}`;
          await Bun.write(pathName, body.thumbnail);
          return product;
        }
      }
      return await ProductService.update(id, body);
    },
    {
      params: "id.dto",
      body: "product.dto",
    }
  )
  .post(
    "/",
    async ({ body }) => {
      let product: Product = await ProductService.create(body);
      if (body.thumbnail && product) {
        const file = Bun.file(body.thumbnail.name);
        const [, type] = file.type.split("/");
        const fileName = `${uuidv4()}.${type}`;
        product = await ProductService.update(product.id, product, fileName);
        if (product) {
          const pathName = `uploads/image/${fileName}`;
          await Bun.write(pathName, body.thumbnail);
          return product;
        }
      }
      return product;
    },
    {
      body: "product.dto",
    }
  );
export default product;
