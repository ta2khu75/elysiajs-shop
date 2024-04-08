import { Elysia, t } from "elysia";
import { categoryDto } from "../dtos/category.dto";
import { CategoryService } from "../services/category.service";
const category = new Elysia({ prefix: "category" })
  .use(categoryDto)
  .get("/", () => CategoryService.select())
  .put("/:id", ({ params: { id }, body }) => CategoryService.update(id, body), {
    params: t.Object({
      id: t.Numeric(),
    }),
    body: "category.dto"
  })
  .post("/", ({ body }) => CategoryService.create(body), {
    body: "category.dto"
  })
  .delete("/:id", ({ params: { id } }) => CategoryService.delete(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .get("/:id", ({ params: { id } }) => CategoryService.find(id), {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

export default category;