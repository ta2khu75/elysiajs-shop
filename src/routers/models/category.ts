import { Elysia, t } from "elysia";
import { categoryDto } from "../../dtos/models/category.dto";
import { CategoryService } from "../../services/models/category.service";
import { BadRequestError } from "../../error/BadRequestError";
const category = new Elysia({ prefix: "category" })
  .use(categoryDto)
  .get("/", () => CategoryService.select())
  .get(
    "/image/:image",
    ({ params: { image } }) => {
      return Bun.file(`uploads/image/category/${image}`);
    },
    {
      params: t.Object({
        image: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params: { id }, body }) => {
      try {
        await CategoryService.update(id, body);
        return { message: "Update category complete" };
      } catch (error) {
        throw new BadRequestError(`Can't update category with error: ${error}`);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: "category.dto",
    }
  )
  .post(
    "/",
    async ({ body }) => {
      try {
        await CategoryService.create(body);
        return { message: "Create category complete" };
      } catch (error) {
        throw new BadRequestError(`Can't create category with error: ${error}`);
      }
    },
    {
      body: "category.dto",
    }
  )
  .delete(
    "/:id",
    async ({ params: { id } }) => {
      try {
        await CategoryService.delete(id);
        return { message: "Delete category complete" };
      } catch (error) {
        throw new BadRequestError(`Can't delete category with error: ${error}`);
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get(
    "/:id",
    async ({ params: { id } }) => {
      try {
        const data = await CategoryService.find(id);
        return { message: "Found Category", data };
      } catch (error) {}
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

export default category;
