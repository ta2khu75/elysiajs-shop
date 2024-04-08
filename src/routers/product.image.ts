import { Elysia, t } from "elysia";
import { v4 as uuidv4 } from "uuid";
import { ProductImageDto, productImageDto } from "../dtos/productImage.dto";
import { ProductImageService } from "../services/productImage.service";
import { ProductImage } from "@prisma/client";
const productImage = new Elysia({ prefix: "product-image" })
  .use(productImageDto)
  .get("/", () => ProductImageService.select())
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      let file;
      let image;
      if (Array.isArray(body.image)) {
        image = body.image[0];
        file = Bun.file(body.image[0].name);
      } else {
        image = body.image;
        file = Bun.file(body.image.name);
      }
      const [, type] = file.type.split("/");
      const fileName = `${uuidv4()}.${type}`;
      const data: ProductImageDto = {
        productId: body.productId,
        image: fileName,
      };
      const productImage: ProductImage = await ProductImageService.update(
        id,
        data
      );
      if (productImage) {
        const pathName = `uploads/image/${fileName}`;
        await Bun.write(pathName, image);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "product.image.dto",
    }
  )
  .post(
    "/",
    async ({ body }) => {
      if (Array.isArray(body.image)) {
        return await Promise.all(
          body.image.map(async (image: File) => {
            const file = Bun.file(image.name);
            const [, type] = file.type.split("/");
            const fileName = `${uuidv4()}.${type}`;
            const data: ProductImageDto = {
              productId: body.productId,
              image: fileName,
            };
            const productImage: ProductImage = await ProductImageService.create(
              data
            );
            if (productImage) {
              const pathName = `uploads/image/${fileName}`;
              await Bun.write(pathName, image);
            }
            return productImage;
          })
        );
      }
      const file = Bun.file(body.image.name);
      const [, type] = file.type.split("/");
      const fileName = `${uuidv4()}.${type}`;
      const data: ProductImageDto = {
        productId: body.productId,
        image: fileName,
      };
      const productImage: ProductImage = await ProductImageService.create(data);
      if (productImage) {
        const pathName = `uploads/image/${fileName}`;
        await Bun.write(pathName, body.image);
      }
      return productImage;
    },
    {
      body: "product.image.dto",
    }
  )
  .delete("/:id", ({ params: { id } }) => ProductImageService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => ProductImageService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default productImage;
