import { Elysia, t } from "elysia";
import { sizeDto } from "../../dtos/models/size.dto";
import { SizeService } from "../../services/models/size.service";
import { BadRequestError } from "../../error/BadRequestError";
const size = new Elysia({ prefix: "size" })
  .use(sizeDto)
  .get("/", () => SizeService.select())
  .get(
    "/product/:id",
    async ({ params: { id } }) => {
      try {
        const data = await SizeService.findProduct(id);
        return data;
      } catch (error) {
        throw new Error("Could not find size product with error " + error);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .put("/:id", ({ params: { id }, body }) => SizeService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "size.dto",
  })
  .post(
    "/",
    async ({ body }) => {
      try {
        await SizeService.create(body);
        return { message: "Size created successfully" };
      } catch (error) {
        throw new BadRequestError("Could not create size with error: " + error);
      }
    },
    {
      body: "size.dto",
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        await SizeService.delete(id);
        return { message: "Size deleted successfully" };
      } catch (error) {
        throw new BadRequestError("Could not delete size with error: " + error);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get("/:id", ({ params: { id } }) => SizeService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default size;
