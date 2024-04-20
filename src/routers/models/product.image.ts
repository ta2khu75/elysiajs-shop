import { Elysia, t } from "elysia";
import {
  ProductImageDto,
  productImageDto,
} from "../../dtos/models/productImage.dto";
import { ProductImageService } from "../../services/models/productImage.service";
import { BadRequestError } from "../../error/BadRequestError";
const productImage = new Elysia({ prefix: "product-images" })
  .use(productImageDto)
  .guard(
    {
      headers: t.Object({
        authorization: t.TemplateLiteral("Bearer ${string}"),
      }),
    },
    (app) =>
      app
        .resolve(({ headers: { authorization } }) => {
          return {
            bearer: authorization.split(" ")[1],
          };
        })
        .onBeforeHandle(async ({ bearer, jwt, set }) => {
          const result = await jwt.verify(bearer);
          if (!result) {
            set.status = 401;
            return { message: "Authorization" };
          }
          if (result.roleId < 2) {
            set.status = 403;
            return { message: "Forbidden" };
          }
        })
        .put(
          "/:id",
          async ({ params: { id }, body }) => {
            try {
              await ProductImageService.update(id, body);
              return { message: "update product image successfully" };
            } catch (error) {
              throw new BadRequestError(
                "Error updating product image with error: " + error
              );
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
            try {
              await ProductImageService.create(body);
              return { message: "create ProductImage successfully" };
            } catch (error) {
              throw new BadRequestError(
                `create productImage failed with error ${error}`
              );
            }
          },
          {
            body: "product.image.dto",
          }
        )
        .delete(
          "/:id",
          async ({ params: { id } }) => {
            try {
              await ProductImageService.delete(id);
              return { message: "delete product image successfully" };
            } catch (error) {
              throw new BadRequestError(
                "Couldn't delete product image with error " + error
              );
            }
          },
          {
            params: t.Object({
              id: t.Numeric(),
            }),
          }
        )
  )
  .get("/", () => ProductImageService.select())
  .get(
    "/product/:id",
    ({ params: { id } }) => {
      return ProductImageService.selectByProduct(id);
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get(
    "/image/:id",
    async ({ params: { id }, query: { name } }) => {
      return Bun.file(`uploads/image/product/${id}/${name}`);
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      query: t.Object({
        name: t.String(),
      }),
    }
  )

  .get("/:id", ({ params: { id } }) => ProductImageService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default productImage;
